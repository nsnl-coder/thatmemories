import { NextFunction, Request, Response } from 'express';
import { ReqQuery } from '../types/express';

interface Filter {
  [key: string]: any;
}

const parseReqQuery = (req: Request, res: Response, next: NextFunction) => {
  let {
    fields,
    page,
    itemsPerPage,
    sort,
    skip,
    limit,
    searchBy,
    keyword,
    startAfter,
    prefix,
    key,
    ...filter
  } = req.query;

  let parsedFilter = handleQueryList(filter);
  let filterStr = JSON.stringify(parsedFilter);
  filterStr = filterStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  const filterObject = JSON.parse(filterStr);

  let query = {
    fields,
    page,
    itemsPerPage,
    sort,
    skip,
    limit,
    startAfter,
    prefix,
    key,
    filter: {
      ...filterObject,
      ...handleSearch(searchBy, keyword),
    },
  };

  query.filter;

  req.query = query as ReqQuery;
  next();
};

function handleSearch(
  searchBy: string | string[] | undefined,
  keyword: string | undefined,
): Filter {
  if (!searchBy || !keyword) return {};
  if (typeof keyword !== 'string') return {};

  if (typeof searchBy === 'string' && !searchBy.includes(',')) {
    return {
      [searchBy]: {
        $regex: keyword,
        $options: 'i',
      },
    };
  }

  if (typeof searchBy === 'string' && searchBy.includes(',')) {
    searchBy = searchBy.split(',');
  }

  if (!Array.isArray(searchBy)) return {};

  const matchArr = searchBy.map((key) => {
    return {
      [key]: {
        $regex: keyword,
        $options: 'i',
      },
    };
  });

  return {
    $or: matchArr,
  };
}

function handleQueryList(filter: Filter): Filter {
  const keys = Object.keys(filter);

  keys.forEach((key) => {
    if (typeof filter[key] === 'string' && filter[key].includes(',')) {
      filter[key] = { $in: filter[key].split(',') };
    }
  });

  return filter;
}

export default parseReqQuery;
