import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Model } from 'mongoose';

interface Options {
  verifiedUserOnly: boolean;
}

const requireLogin = (
  User: Model<any>,
  options: Options = { verifiedUserOnly: true },
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.cookies?.jwt;

    if (!jwtToken) {
      return res.status(401).json({
        status: 'fail',
        message:
          'You are not logged in! Please logged in to perform the action',
      });
    }

    if (!process.env.JWT_SECRET) {
      console.log('add JWT_SECRET to your .env file');
      return;
    }

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    if (typeof decoded === 'string') {
      return res.status(404).json({
        status: 'fail',
        message: 'Cant find an user belongs to provided token',
      });
    }

    const { id, iat = 0 } = decoded;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cant find an user belongs to provided token',
      });
    }

    if (user.passwordChangedAt) {
      const duration =
        Number(new Date(iat * 1000)) - Number(new Date(user.passwordChangedAt));

      const isTokenExpired = duration < 0;
      if (isTokenExpired) {
        return res.status(400).json({
          status: 'fail',
          message: 'You recently changed password, please login again!',
        });
      }
    }

    if (!user.isVerified && options.verifiedUserOnly) {
      return res.status(401).json({
        status: 'fail',
        message: 'Please verified your email to complete this action!',
      });
    }

    req.user = user;
    next();
  };
};

export default requireLogin;
