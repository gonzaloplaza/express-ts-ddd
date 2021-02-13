import { Router } from 'express';
import * as controllers from '../controllers';

export const ApiRouter = (
  IndexController: controllers.IndexController,
  HealthCheckController: controllers.HealthCheckController,
  GetActivitiesController: controllers.GetActivitiesController,
  CreateActivityController: controllers.CreateActivityController
): Router => {
  const apiRouter = Router();
  apiRouter.get('/', IndexController.invoke.bind(IndexController));
  apiRouter.get('/health_check', HealthCheckController.invoke.bind(HealthCheckController));
  apiRouter.get('/activities', GetActivitiesController.invoke.bind(GetActivitiesController));
  apiRouter.post('/activities', CreateActivityController.invoke.bind(CreateActivityController));

  return apiRouter;
};
