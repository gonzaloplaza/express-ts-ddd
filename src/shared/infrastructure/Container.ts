import {
  asClass,
  createContainer,
  asFunction,
  InjectionMode,
  AwilixContainer,
  asValue
} from 'awilix';
import { Server } from './Server';
import { Router } from './Router';

//Import injectables from api bounded context
import * as ApiControllers from '../../api/infrastructure/express/controllers';
import * as ApiServices from '../../api/application';

//Shared infrastructure implementations
import { ErrorMiddleware } from './express/ErrorMiddleware';
import { Uuidv4Generator } from './uuid';
import { PrismaActivityRepository } from '../../api/infrastructure/persistence/prisma/PrismaActivityRepository';
import { ApiRouter } from '../../api/infrastructure/express/router';
import { PrismaClientInstance } from '../infrastructure/prisma';
import { ServerLogger } from './logger';
import { config } from '../../../config';

export class Container {
  private container: AwilixContainer;

  constructor() {
    this.container = createContainer({
      injectionMode: InjectionMode.CLASSIC
    });

    this.register();
  }

  public register(): void {
    this.container
      .register({
        //core components
        server: asClass(Server).singleton(),
        config: asValue(config),
        router: asFunction(Router).singleton(),
        logger: asClass(ServerLogger).singleton(),
        db: asFunction(PrismaClientInstance).singleton()
      })
      .register({
        errorMiddleware: asClass(ErrorMiddleware).singleton(),
        apiRouter: asFunction(ApiRouter).singleton()
      })
      .register({
        uuidGenerator: asClass(Uuidv4Generator).singleton()
      })
      .register({
        IndexController: asClass(ApiControllers.IndexController).singleton()
      })
      .register({
        HealthCheckController: asClass(ApiControllers.HealthCheckController).singleton(),
        healthCheckService: asClass(ApiServices.HealthCheckService).singleton()
      })
      .register({
        GetActivitiesController: asClass(ApiControllers.GetActivitiesController).singleton(),
        CreateActivityController: asClass(ApiControllers.CreateActivityController).singleton(),
        getActivitiesService: asClass(ApiServices.GetActivitiesService).singleton(),
        createActivityService: asClass(ApiServices.CreateActivityService).singleton(),
        activityRepository: asClass(PrismaActivityRepository).singleton()
      });
  }

  public invoke(): AwilixContainer {
    return this.container;
  }
}
