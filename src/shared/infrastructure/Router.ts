import { Router as ExpressRouter } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';

import {
    RouteNotFoundErrorHandler,
    ClientErrorHandler,
    CustomErrorHandler,
    GlobalErrorHandler
} from './middlewares/ErrorMiddleware';

export const Router = (apiRouter: ExpressRouter): ExpressRouter => {
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
    router.use(RouteNotFoundErrorHandler);
    router.use(ClientErrorHandler);
    router.use(CustomErrorHandler);
    router.use(GlobalErrorHandler);

    return router;
};
