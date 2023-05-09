import { IProduct } from '@thatmemories/yup';
import { NextFunction, Request, Response } from 'express';
import { Product } from '../models/productModel';
import { ReqQuery } from '../types/express';

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const product = await Product.create(req.body);
  res.status(201).json({ status: 'success', data: product });
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      status: 'success',
      message: 'Can not find product with provided id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: product,
  });
};

const getRandomProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    fields,
    sort = '-createdAt', // new to old
    filter = {},
  } = req.query as ReqQuery;

  const limit = req.query.limit || 5;

  const castedFilter = Product.find(filter).cast();

  const data: { totalResults: [{ total: number }]; matches: IProduct[] }[] =
    await Product.aggregate([
      {
        $match: { status: 'active' },
      },
      {
        $facet: {
          totalResults: [{ $count: 'total' }],
          matches: [
            {
              $match: castedFilter,
            },
            {
              $sample: {
                size: Number(limit) || 5,
              },
            },
            {
              $project: {
                name: 1,
                price: 1,
                discountPrice: 1,
                previewImages: 1,
                slug: 1,
                numberOfRatings: 1,
                ratingsAverage: 1,
              },
            },
          ],
        },
      },
    ]);

  const products = data[0].matches;
  const totalResults = data[0].totalResults[0].total;

  res.status(200).json({
    status: 'success',
    pagination: {
      totalPages: Math.round(totalResults / limit),
      totalResults,
      currentPage: 1,
      itemsPerPage: limit,
      results: products.length,
    },
    data: products,
  });
};

const getManyProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    fields,
    sort = '-createdAt', // new to old
    page = 1,
    itemsPerPage = 10,
    filter = {},
  } = req.query as ReqQuery;

  if (req.user?.role !== 'admin') {
    filter.status = 'active';
  }

  // 0. check how many result
  const matchingResults = await Product.countDocuments(filter);
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
  let query = Product.find(filter);

  // 2. sorting
  query = query.sort(`-isPinned ${sort}`);

  // 3. limit fields
  if (fields) {
    query = query.select(fields);
  }

  // 4. pagination
  const skip = (page - 1) * itemsPerPage;
  const limit = itemsPerPage;

  query = query.skip(skip).limit(limit);

  // 5. finally await query
  const products = await query.populate(
    'collections',
    'display_name hidden_name',
  );

  res.status(200).json({
    status: 'success',
    pagination: {
      ...pagination,
      results: products.length,
    },
    data: products,
  });
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({
      status: 'fail',
      message: 'Can not find product with provided id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: product,
  });
};

const updateManyProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { updateList, ...payload } = req.body;

  // check if ids in updateList all exist
  const matchedDocuments = await Product.countDocuments({
    _id: {
      $in: updateList,
    },
  });

  if (matchedDocuments < updateList.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Can not find product with provided ids',
    });
  }

  const { modifiedCount } = await Product.updateMany(
    {
      _id: {
        $in: updateList,
      },
    },
    payload,
  );

  if (modifiedCount !== updateList.length) {
    return res.status(400).json({
      status: 'fail',
      message: 'Something went wrong!',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      modifiedCount,
    },
  });
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(404).json({
      status: 'fail',
      message: 'Cant not find product with provided id',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'you successfully delete your product',
  });
};

const deleteManyProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const deleteList = req.body.deleteList;

  const { deletedCount } = await Product.deleteMany({
    _id: {
      $in: deleteList,
    },
  });

  if (deletedCount === 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Can not find products with provided ids',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Successfully deleted products',
    data: {
      deletedCount,
    },
  });
};

export {
  createProduct,
  getProduct,
  getManyProducts,
  getRandomProducts,
  updateProduct,
  updateManyProducts,
  deleteProduct,
  deleteManyProducts,
};
