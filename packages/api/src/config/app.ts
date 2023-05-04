import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Response } from 'express';
import 'express-async-errors'; // error handler for async middleware
import { routeNotFound } from 'express-common-middlewares';
import logger from 'morgan';
import path from 'path';

import globalErrorHandler from '../middlewares/globalErrorHandler';
import { StripeRequest } from '../middlewares/validateStripeSignature';
import indexRouter from '../routers/index';
import createError from '../utils/createError';

const app = express();

const whitelist = [process.env.FRONTEND_HOST, process.env.ADMIN_HOST];

const checkOrigin = (
  origin: any,
  callback: (error: Error | null, staticOrigin?: any) => void,
) => {
  if (!origin) {
    // TODO: remove this in production
    callback(null, true);
    return;
  }

  if (whitelist.indexOf(origin) !== -1) {
    callback(null, true);
  } else {
    throw createError('Not allowed by cors!');
  }
};

if (process.env.NODE_ENV !== 'test') {
  app.use(cors({ origin: checkOrigin, credentials: true }));
} else {
  app.use(cors());
}

if (process.env.NODE_ENV === 'dev') {
  app.use(logger('dev'));
}

app.use(
  bodyParser.json({
    verify: function (req: StripeRequest, res: Response, buf) {
      var url = req.originalUrl;
      if (url.startsWith('/api/stripe/webhooks')) {
        req.rawBody = buf.toString();
      }
    },
  }),
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use('/', indexRouter);

//
app.use(routeNotFound);
app.use(globalErrorHandler);

export { app };
export default routeNotFound;
