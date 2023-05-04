import { NextFunction, Request, Response } from 'express';
import { Schema, ValidationError } from 'yup';

const validateRequest = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.body = body;
      return next();
    } catch (result: any) {
      let error = result as ValidationError;
      let { errors } = error;

      return res.status(400).json({
        status: 'fail',
        message: 'Data validation failed',
        errors,
      });
    }
  };
};

export default validateRequest;
