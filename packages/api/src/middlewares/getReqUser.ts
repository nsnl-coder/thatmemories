import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Model } from 'mongoose';

const getReqUser = (User: Model<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.cookies?.jwt;

    if (!jwtToken) {
      next();
      return;
    }

    if (!process.env.JWT_SECRET) {
      console.log('add JWT_SECRET to your .env file');
      res.status(500).json({
        status: 'fail',
        message: 'Server error!',
      });
      return;
    }

    try {
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

      if (typeof decoded === 'string') {
        next();
        return;
      }

      const { id, iat = 0 } = decoded;
      const user = await User.findById(id).select('+role');

      if (!user) return next();

      if (user.passwordChangedAt) {
        const duration =
          Number(new Date(iat * 1000)) -
          Number(new Date(user.passwordChangedAt));

        const isTokenExpired = duration < 0;

        if (isTokenExpired) return next();
      }
      req.user = user;
      next();
    } catch (err) {
      next();
    }
  };
};

export default getReqUser;
