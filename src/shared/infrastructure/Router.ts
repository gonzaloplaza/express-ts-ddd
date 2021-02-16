import { Router as ExpressRouter } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import { ErrorMiddleware } from './express/ErrorMiddleware';

export const Router = (
  apiRouter: ExpressRouter,
  errorMiddleware: ErrorMiddleware
): ExpressRouter => {
  const router = ExpressRouter();

  router
    .use(helmet())
    .use(cors())
    .use(bodyParser.json())
    .use(
      bodyParser.urlencoded({
        extended: false
      })
    )
    .use(compression());
  router.use(apiRouter);
  router.use(errorMiddleware.routeNotFoundErrorHandler);
  router.use(errorMiddleware.clientErrorHandler);
  router.use(errorMiddleware.customErrorHandler);
  router.use(errorMiddleware.globalErrorHandler);

  return router;
};
