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
import { createPrismaClient } from './prisma';
import { ServerLogger } from './logger';
import { config } from '../../../config';
import {
  CognitoAuthenticator,
  CognitoAuthorizer
} from '../../api/infrastructure/authentication/cognito';
import { CognitoClient } from '../../api/infrastructure/authentication/cognito/CognitoClient';
import { CognitoJwtVerifier } from '../../api/infrastructure/authentication/cognito/CognitoJwtVerifier';

export class Container {
  private readonly container: AwilixContainer;

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
        db: asFunction(createPrismaClient).singleton()
      })
      .register({
        errorMiddleware: asClass(ErrorMiddleware).singleton(),
        apiRouter: asFunction(ApiRouter).singleton()
      })
      .register({
        uuidGenerator: asClass(Uuidv4Generator).singleton()
      })
      .register({
        indexController: asClass(ApiControllers.IndexController).singleton()
      })
      .register({
        healthCheckController: asClass(ApiControllers.HealthCheckController).singleton(),
        healthCheckService: asClass(ApiServices.HealthCheckService).singleton()
      })
      .register({
        postAuthenticationController: asClass(
          ApiControllers.PostAuthenticationController
        ).singleton(),
        authenticationService: asClass(ApiServices.AuthenticationService).singleton(),
        authenticator: asClass(CognitoAuthenticator).singleton(),
        client: asClass(CognitoClient).singleton(),
        authorizer: asClass(CognitoAuthorizer).singleton(),
        jwtVerifier: asClass(CognitoJwtVerifier).singleton()
      })
      .register({
        getActivitiesController: asClass(ApiControllers.GetActivitiesController).singleton(),
        createActivityController: asClass(ApiControllers.CreateActivityController).singleton(),
        getActivitiesService: asClass(ApiServices.GetActivitiesService).singleton(),
        createActivityService: asClass(ApiServices.CreateActivityService).singleton(),
        activityRepository: asClass(PrismaActivityRepository).singleton()
      });
  }

  public invoke(): AwilixContainer {
    return this.container;
  }
}
