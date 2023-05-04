import { IHome } from '@thatmemories/yup';
import { NextFunction, Request, Response } from 'express';
import { Home } from '../models/homeModel';
import { ReqQuery } from '../types/express';

const createHome = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const home = await Home.create(body);
  res.status(201).json({ status: 'success', data: home });
};

const getCurrentHomePage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const home = await Home.findOne({ status: 'active' })
    .populate('featuredCollections', 'display_name photo description slug')
    .populate(
      'featuredProducts',
      'name price discountPrice previewImages slug',
    );

  if (!home) {
    res.status(404).json({
      status: 'fail',
      message: 'Can not find any homepage!',
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: home,
  });
};

const getHome = async (req: Request, res: Response, next: NextFunction) => {
  const home: IHome | null = await Home.findById(req.params.id);

  if (!home) {
    return res.status(404).json({
      status: 'success',
      message: 'Can not find home with provided id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: home,
  });
};

const getManyHomes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let {
    fields,
    sort = '-createdAt', // new to old
    page = 1,
    itemsPerPage = 10,
    filter,
  } = req.query as ReqQuery;

  // 0. check how many result
  const matchingResults = await Home.countDocuments(filter);
  const totalPages = Math.ceil(matchingResults / itemsPerPage);

  const pagination = {
    currentPages: page,
    results: 0,
    totalPages,
    totalResults: matchingResults,
    currentPage: page,
    itemsPerPage,
  };

  if (page > totalPages) {
    return res.status(200).json({
      status: 'success',
      pagination,
    });
  }

  // 1. create inital query but not await it
  let query = Home.find(filter);

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
  const homes = await query;

  res.status(200).json({
    status: 'success',
    pagination: {
      ...pagination,
      results: homes.length,
    },
    data: homes,
  });
};

const updateHome = async (req: Request, res: Response, next: NextFunction) => {
  const home: IHome = req.body;

  const updatedHome = await Home.findByIdAndUpdate(
    { _id: req.params.id },
    home,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedHome) {
    return res.status(404).json({
      status: 'fail',
      message: 'Can not find home with provided id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: updatedHome,
  });
};

const updateManyHomes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { updateList, ...payload } = req.body;

  // TODO: need to destruct home
  const home = payload as IHome;

  // check if ids in updateList all exist
  const matchedDocuments = await Home.countDocuments({
    _id: {
      $in: updateList,
    },
  });

  if (matchedDocuments < updateList.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Can not find home with provided ids',
    });
  }

  const { modifiedCount } = await Home.updateMany(
    {
      _id: {
        $in: updateList,
      },
    },
    home,
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

const deleteHome = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const home = await Home.findByIdAndDelete(id);

  if (!home) {
    return res.status(404).json({
      status: 'fail',
      message: 'Cant not find home with provided id',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'you successfully delete your home',
  });
};

const deleteManyHomes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const deleteList = req.body.deleteList;

  const { deletedCount } = await Home.deleteMany({
    _id: {
      $in: deleteList,
    },
  });

  if (deletedCount === 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Can not find homes with provided ids',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Successfully deleted homes',
    data: {
      deletedCount,
    },
  });
};

export {
  createHome,
  getCurrentHomePage,
  getHome,
  getManyHomes,
  updateHome,
  updateManyHomes,
  deleteHome,
  deleteManyHomes,
};
