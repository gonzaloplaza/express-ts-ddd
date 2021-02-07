import { Router as ExpressRouter } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import * as controllers from '../../api/infrastructure/express/controllers';
import {
    RouteNotFoundErrorHandler,
    ClientErrorHandler,
    CustomErrorHandler,
    GlobalErrorHandler
} from './middlewares/ErrorMiddleware';

export const Router = (
    IndexController: controllers.IndexController,
    HealthCheckController: controllers.HealthCheckController
): ExpressRouter => {
    const router = ExpressRouter();
    const apiRouter = ExpressRouter();

    apiRouter
        .use(helmet())
        .use(cors())
        .use(bodyParser.json())
        .use(
            bodyParser.urlencoded({
                extended: false
            })
        )
        .use(compression());

    apiRouter.get('/', IndexController.invoke.bind(IndexController));
    apiRouter.get('/health_check', HealthCheckController.invoke.bind(HealthCheckController));

    router.use(apiRouter);
    router.use(RouteNotFoundErrorHandler);
    router.use(ClientErrorHandler);
    router.use(CustomErrorHandler);
    router.use(GlobalErrorHandler);

    return router;
};
