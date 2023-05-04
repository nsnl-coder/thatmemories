// handle required field missing && handle cast error

import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/createError';

const handleDuplicationField = (error: any) => {
  const duplicateField = Object.keys(error.keyValue)[0];
  return `${duplicateField} already exists. Please choose another ${duplicateField}`;
};

const globalErrorHandler = (
  error: any | CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.status || 400;

  let formarttedError = 'Something wentwrong';

  if (
    error.name === 'JsonWebTokenError' ||
    error.name === 'TokenExpiredError' ||
    error.name === 'CastError'
  ) {
    formarttedError = error.message;
  }

  if (error.code === 11000) {
    formarttedError = handleDuplicationField(error);
  }

  if (error.isCustomError) {
    formarttedError = error.message;
  }

  if (formarttedError === 'Something wentwrong') {
    console.log(error);
  }

  res.status(statusCode).json({ status: 'fail', message: formarttedError });
};

export default globalErrorHandler;
