import {
  CreateOrderPayload,
  ICreateOrderPayloadItem,
  IOrder,
  IOrderItem,
} from '@thatmemories/yup';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { createPaymentIntent } from '../config/stripe';
import { Order } from '../models/orderModel';
import { Product } from '../models/productModel';
import { Shipping } from '../models/shippingModel';
import { ReqQuery } from '../types/express';
import createError from '../utils/createError';
import { getCouponStatus } from './couponController';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  let order: CreateOrderPayload = req.body;
  let { items, ...payload } = order;

  const populatedItems: ICreateOrderPayloadItem[] = (await Product.populate(
    items,
    {
      path: 'product',
      select: 'name price slug variants discountPrice previewImages',
    },
  )) as any;

  const updatedItems: IOrderItem[] = getUpdatedItems(populatedItems);
  const { notes, phone, email, fullname, shippingAddress, couponCode } =
    payload;

  const orderInfo = await getOrderInfo(updatedItems, payload);

  const orderDetail: Omit<IOrder, '_id'> = {
    items: updatedItems,
    createdBy: new mongoose.Schema.Types.ObjectId(req.user!._id),
    fullname,
    email,
    phone,
    shippingAddress,
    notes,
    //
    orderNumber: randomOrderNumber(100000, 999999),
    subTotal: orderInfo.subTotal,
    grandTotal: orderInfo.grandTotal,
    shipping: orderInfo.shipping,
    discount: {
      inDollar: orderInfo.discountInDollar,
      inPercent: orderInfo.discountInPercent,
      couponCode: couponCode || '',
    },
    //
    shippingStatus: 'pending',
    paymentStatus: 'processing',
  };

  console.log(`client ${order.grandTotal}, server: ${orderInfo.grandTotal} `);

  if (orderInfo.grandTotal !== order.grandTotal) {
    return res.status(400).json({
      status: 'success',
      message: 'Received grandTotal and calculated grandTotal are not the same',
      data: orderInfo,
    });
  }

  if (orderInfo.grandTotal < 0) {
    return res.status(400).json({
      status: 'success',
      message: 'Something went wrong. Please try again later',
    });
  }

  const newOrder = await Order.create(orderDetail);

  const client_secret = await createPaymentIntent(res, newOrder);

  res.status(201).json({
    status: 'success',
    message: 'You successfully created an order',
    data: {
      client_secret,
      order: newOrder,
    },
  });
};

const getOrderInfo = async (
  updatedItems: IOrderItem[],
  payload: Omit<CreateOrderPayload, 'items'>,
) => {
  const { couponCode, shippingMethod } = payload;

  const subTotal = updatedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  let coupon = {
    discountInPercent: 0,
    discountInDollar: 0,
  };

  if (couponCode) {
    const { discountInPercent, discountInDollar } = await getCouponStatus(
      couponCode,
      subTotal,
    );

    if (discountInDollar > 0 || discountInPercent > 0) {
      coupon.discountInDollar = discountInDollar;
      coupon.discountInPercent = discountInPercent;
    }
  }

  const shipping = await Shipping.findById(shippingMethod).select(
    '_id display_name delivery_min delivery_max delivery_min_unit delivery_max_unit fees freeshipOrderOver',
  );

  if (!shipping) {
    throw createError('Provided shipping method does not exist!');
  }

  if (shipping.freeshipOrderOver && subTotal > shipping.freeshipOrderOver) {
    shipping.fees = 0;
  }

  const grandTotal = subTotal - coupon.discountInDollar + shipping.fees!;

  return {
    subTotal,
    grandTotal,
    shipping: {
      name: shipping.display_name || 'Standard shipping',
      fees: shipping.fees || 0,
    },
    discountInPercent: coupon.discountInPercent,
    discountInDollar: coupon.discountInDollar,
    couponCode,
  };
};

const randomOrderNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// updatedItems: items with final price after check discount price, variant price
const getUpdatedItems = (items: ICreateOrderPayloadItem[]): IOrderItem[] => {
  const updatedItems: IOrderItem[] = [];

  items.forEach((item, i) => {
    const newItem: IOrderItem = {
      productName: item.product.name!,
      photos: [],
      price: item.product.discountPrice || item.product.price!,
      quantity: item.quantity,
      variants: [],
    };

    // product has no variants
    if (!item.product.variants || !item.product.variants?.length) {
      updatedItems.push(newItem);
      return;
    }

    // product has variants
    // did not select options
    if (!item.selectedOptions || !item.selectedOptions.length) {
      throw createError('You must select one option for each variant');
    }

    if (item.selectedOptions.length !== item.product.variants.length) {
      throw createError('You must select one option for each variant');
    }

    // get selected option
    const allOptions = getAllOptions(items[i].product);

    const selectedOptions = item.selectedOptions.map((option) => {
      if (allOptions[option]) {
        return allOptions[option];
      }
      throw createError('Provided product option does not exist.');
    });

    // get item data
    const { highestPrice, photos } = getOptionImageAndPrice(selectedOptions);

    if (highestPrice > item.product.price!) {
      newItem.price = highestPrice;
    } else {
      newItem.price = item.product.price!;
    }

    if (photos.length) {
      newItem.photos = photos;
    } else {
      newItem.photos = (item.product.previewImages as string[]) || [];
    }

    if (!item.quantity) {
      item.quantity = 1;
    }

    newItem.productName = item.product.name!;
    newItem.variants =
      selectedOptions.map((o) => ({
        variantName: o.variantName,
        optionName: o.optionName,
      })) || [];

    updatedItems.push(newItem);
  });

  return updatedItems;
};

const getOptionImageAndPrice = (
  selectedOptions: TransformedOption[],
): { highestPrice: number; photos: string[] } => {
  let highestPrice = 0;
  let photos: string[] = [];

  selectedOptions.forEach((option) => {
    if (option.price && option.price > highestPrice) {
      highestPrice = option.price;
      if (option.photo) photos.push(option.photo);
    }
  });

  return { highestPrice, photos };
};

interface TransformedOption {
  variantName?: string;
  _id?: string;
  price?: number;
  optionName?: string;
  photo?: string;
}

interface OptionsObj {
  [_id: string]: TransformedOption;
}

const getAllOptions = (
  product: ICreateOrderPayloadItem['product'],
): OptionsObj => {
  const optionsObj: OptionsObj = {};

  product.variants?.forEach((variant) => {
    variant.options?.forEach((option) => {
      if (option._id && typeof option === 'object') {
        optionsObj[option._id] = {
          ...JSON.parse(JSON.stringify(option)),
          variantName: variant.variantName,
        };
      }
    });
  });

  return optionsObj;
};

// =========================================================
// =========================================================

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      status: 'success',
      message: 'Can not find order with provided id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: order,
  });
};

const getManyOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    fields,
    sort = '-createdAt', // new to old
    page = 1,
    itemsPerPage = 10,
    filter,
  } = req.query as ReqQuery;

  // 0. check how many result
  const matchingResults = await Order.countDocuments(filter);
  const totalPages = Math.ceil(matchingResults / itemsPerPage);

  let pagination = {
    currentPage: page,
    totalPages,
    itemsPerPage,
    totalResults: matchingResults,
    results: 0,
  };

  if (page > totalPages) {
    return res.status(200).json({
      status: 'success',
      data: [],
      pagination,
    });
  }

  // 1. create inital query but not await it
  let query = Order.find(filter);

  // 2. sorting
  query = query.sort(sort);

  // 3. limit fields
  if (fields) {
    query = query.select(fields);
  }

  // 4. pagination
  const skip = (page - 1) * itemsPerPage;
  const limit = itemsPerPage;

  query = query.skip(skip).limit(limit);

  // 5. finally await query
  const orders = await query;

  res.status(200).json({
    status: 'success',
    pagination: {
      ...pagination,
      results: orders.length,
    },
    data: orders,
  });
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  const {
    fullname,
    email,
    phone,
    shippingAddress,
    shippingStatus,
    paymentStatus,
    notes,
  } = req.body;

  const order = await Order.findByIdAndUpdate(
    { _id: req.params.id },
    {
      fullname,
      email,
      phone,
      shippingAddress,
      shippingStatus,
      paymentStatus,
      notes,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!order) {
    return res.status(404).json({
      status: 'fail',
      message: 'Can not find order with provided id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: order,
  });
};

const updateManyOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { updateList, ...payload } = req.body;

  // check if ids in updateList all exist
  const matchedDocuments = await Order.countDocuments({
    _id: {
      $in: updateList,
    },
  });

  if (matchedDocuments < updateList.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Can not find order with provided ids',
    });
  }

  const {
    fullname,
    email,
    phone,
    shippingAddress,
    shippingStatus,
    paymentStatus,
    notes,
  } = payload;

  const { modifiedCount } = await Order.updateMany(
    {
      _id: {
        $in: updateList,
      },
    },
    {
      fullname,
      email,
      phone,
      shippingAddress,
      shippingStatus,
      paymentStatus,
      notes,
    },
    {
      runValidators: true,
    },
  );

  res.status(200).json({
    status: 'success',
    data: {
      modifiedCount,
    },
  });
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    return res.status(404).json({
      status: 'fail',
      message: 'Cant not find order with provided id',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'you successfully delete your order',
  });
};

const deleteManyOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const deleteList = req.body.deleteList;

  const { deletedCount } = await Order.deleteMany({
    _id: {
      $in: deleteList,
    },
  });

  if (deletedCount === 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Can not find orders with provided ids',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Successfully deleted orders',
    data: {
      deletedCount,
    },
  });
};

export {
  createOrder,
  getOrder,
  getManyOrders,
  updateOrder,
  updateManyOrders,
  deleteOrder,
  deleteManyOrders,
};
