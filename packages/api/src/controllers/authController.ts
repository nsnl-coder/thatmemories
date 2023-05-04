import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import hoursToMilliseconds from 'date-fns/hoursToMilliseconds';
import jwt from 'jsonwebtoken';

//
import { IUser } from '@thatmemories/yup';
import { NextFunction, Request, Response } from 'express';
import { MAIL_EVENTS, eventEmitter } from '../config/eventEmitter';
import { User } from '../models/userModel';
import createError from '../utils/createError';
import { sendForgotPasswordEmail } from '../utils/email';

const signJwtToken = (id: string) => {
  if (!process.env.JWT_SECRET) {
    throw createError('Can not read jwt secret!');
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  return { token, hashedToken };
};

const resWithCookie = (
  req: Request,
  res: Response,
  user: IUser,
  statusCode: number,
  message: string,
) => {
  const jwtToken = signJwtToken(user._id.toString());

  res.cookie('jwt', jwtToken, {
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  res.status(statusCode).json({
    status: 'success',
    message,
    data: user,
  });
};

const isLoginPasswordCorrect = async function (
  candidatePassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

// ============= IMPLEMENTATION =============

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, fullname, password } = req.body;

  // check if email already exists
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return res.status(400).json({
      status: 'fail',
      message: 'An account with provided email already exists',
    });
  }

  // create new account
  const user = await User.create({
    email,
    password,
    fullname,
    verifyTokenExpires:
      Date.now() +
      hoursToMilliseconds(Number(process.env.VERIFY_EMAIL_TOKEN_EXPIRES || 24)),
  });

  const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: Date.now() + 15 * 60 * 1000,
  });

  // send email verification email to user
  eventEmitter.emit(MAIL_EVENTS.USER_SIGN_UP, {
    to: user.email,
    fullname: user.fullname,
    token,
  });

  const message = 'Check your email inbox to verify your email!';
  resWithCookie(req, res, user, 201, message);
};

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const verifyToken = req.params.token;

  const decoded = jwt.verify(verifyToken, process.env.JWT_SECRET!) as {
    email: string;
  };

  if (!decoded || !decoded.email) {
    return res.status(404).json({
      status: 'fail',
      message: 'Cant find an user belongs to provided email',
    });
  }

  const email = decoded.email;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'Cant find an user belongs to provided email',
    });
  }

  user.isVerified = true;
  user.verifyEmailSentAt = undefined;
  user.verifyEmailsSent = undefined;

  await user.save();

  res.status(200).json({
    status: 'fail',
    message: 'Your email has been verified!',
  });
};

const resendVerifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = await User.findOne({ email: req.user!.email });

  // check if user exists
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'An account with provided email does not exist!',
    });
  }

  // check if user is already verified
  if (user.isVerified) {
    return res.status(200).json({
      status: 'success',
      message: 'You account is already verified!',
    });
  }

  let isEmailSentYesterDay: boolean = false;

  if (user.verifyEmailSentAt) {
    const emailLastSentAt = user.verifyEmailSentAt;
    const difference = Date.now() - Number(new Date(emailLastSentAt));
    isEmailSentYesterDay = difference < hoursToMilliseconds(24);
  }

  if (user.verifyEmailsSent === 3 && isEmailSentYesterDay) {
    return res.status(400).json({
      status: 'fail',
      message:
        'You have reached maxium number of emails resend today! Try again tommorrow!',
    });
  }

  // if old token is not valid, reset number of email sents
  // this is to avoid user spam resend email route
  if (!isEmailSentYesterDay || !user.verifyEmailsSent) {
    user.verifyEmailsSent = 0;
  }

  // create new token and send it to user inbox
  user.verifyEmailsSent++;

  const token = jwt.sign({ email: req.user!.email }, process.env.JWT_SECRET!, {
    expiresIn: Date.now() + 15 * 60 * 1000,
  });

  await user.save();

  // send email verification email to user
  eventEmitter.emit(MAIL_EVENTS.USER_SIGN_UP, {
    to: user.email,
    fullname: user.fullname,
    token,
  });

  res.status(200).json({
    status: 'success',
    message: 'An email has been sent to your inbox!',
  });
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // check if an account with provided email exists
  const user = await User.findOne({ email });

  // check if correct password provided
  const isLoginValid =
    user && (await isLoginPasswordCorrect(password, user.password!));

  if (!isLoginValid) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid email or password',
    });
  }

  // return cookie
  res.cookie('jwt', signJwtToken(user._id.toString()), {
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  // return account info
  const message = 'You have signed in!';
  resWithCookie(req, res, user, 200, message);
};

const signOut = (req: Request, res: Response, next: NextFunction) => {
  res.cookie('jwt', '');
  res.status(200).json({
    status: 'success',
    message: 'You successfully signed out',
  });
};

const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    data: req.user,
  });
};

const updateEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // check if provided password is correct
  const user = req.user!;
  const isPasswordCorrect = await isLoginPasswordCorrect(
    password,
    user.password!,
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({
      status: 'fail',
      message: 'Password is incorrect',
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user!._id,
    { email },
    { new: true },
  );
  res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
};

/**
 * this route is for user still remember their password but want to change it
 */
const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { oldPassword, password } = req.body;

  // check if provided password is correct
  const user = req.user!;
  const isPasswordCorrect = await isLoginPasswordCorrect(
    oldPassword,
    user.password!,
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({
      status: 'fail',
      message: 'Password is incorrect',
    });
  }

  user.password = password;
  await user.save();

  const message = 'You successfully changed your password';
  resWithCookie(req, res, user, 200, message);
};

const updateUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    email,
    password,
    fullname,
    shippingAddress,
    phone,
    isPinned,
    profileImage,
  } = req.body;

  if (email) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please use /api/auth/update-email route to update email',
    });
  }

  if (password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please use /api/auth/update-password route to update password',
    });
  }

  const user = await User.findByIdAndUpdate(
    req.user!._id,
    {
      fullname,
      shippingAddress,
      phone,
      isPinned,
      profileImage,
    },
    { new: true },
  );

  res.status(200).json({
    status: 'success',
    data: user,
  });
};

/**
 * use this route if user forgot their password
 * send an email to user with a link. User can change their password from the link.
 */
const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // returns 404 if can't find user
  if (!user) {
    return res.status(404).json({
      status: 'success',
      message: 'An user with this email does not exist',
    });
  }

  if (user.resetPasswordEmailSentAt) {
    const emailLastSentAt = user.resetPasswordEmailSentAt;
    const difference = Date.now() - Number(new Date(emailLastSentAt));
    const isSentYesterday = difference < hoursToMilliseconds(24);

    if (isSentYesterday && user.resetPasswordEmailsSent === 3) {
      return res.status(400).json({
        status: 'fail',
        message: 'Too many requests! Please try to request again in 24 hours',
      });
    }

    if (!isSentYesterday) {
      user.resetPasswordEmailsSent = 0;
    }
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: Date.now() + 15 * 60 * 1000,
  });

  user.resetPasswordEmailsSent++;
  await user.save();

  // send password reset email to user
  await sendForgotPasswordEmail({
    to: user.email!,
    payload: {
      resetLink: `${process.env.FRONTEND_HOST}/auth/reset-password/${token}`,
      fullname: user.fullname || user.email,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'We sent you an email! Please check your inbox!',
  });
};

/**
 * user this route to reset password for those who forgot their password
 */
const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { password } = req.body;

  const user = req.user;

  if (!user) {
    return res.status(400).json({
      status: 'fail',
      message: 'The token is invalid or expired!',
    });
  }

  user.password = password;

  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'You successfully change your password!',
  });
};

export {
  signUp,
  verifyEmail,
  resendVerifyEmail,
  signIn,
  signOut,
  updateEmail,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateUserInfo,
  getCurrentUser,
  // for testing
  signJwtToken,
  createToken,
};
