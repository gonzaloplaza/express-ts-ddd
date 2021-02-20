import { Request, Response, NextFunction, Router } from 'express';
import { IAuthorizer } from '../../../domain/model/authentication/IAuthorizer';
import * as controllers from '../controllers';

export const ApiRouter = (
  indexController: controllers.IndexController,
  healthCheckController: controllers.HealthCheckController,
  getActivitiesController: controllers.GetActivitiesController,
  createActivityController: controllers.CreateActivityController,
  postAuthenticationController: controllers.PostAuthenticationController,
  authorizer: IAuthorizer<Request, Response, NextFunction>
): Router => {
  const apiRouter = Router();
  const v1Router = Router();

  apiRouter.get('/', indexController.invoke.bind(indexController));
  apiRouter.get('/health_check', healthCheckController.invoke.bind(healthCheckController));
  apiRouter.post(
    '/auth',
    postAuthenticationController.validate,
    postAuthenticationController.invoke.bind(postAuthenticationController)
  );
  v1Router.get(
    '/activities',
    getActivitiesController.validate,
    getActivitiesController.invoke.bind(getActivitiesController)
  );
  v1Router.post(
    '/activities',
    createActivityController.validate,
    createActivityController.invoke.bind(createActivityController)
  );

  // All routes under /api/v1 requires cognito jwt authorization
  apiRouter.use('/api/v1', authorizer.authorize, v1Router);

  return apiRouter;
};
