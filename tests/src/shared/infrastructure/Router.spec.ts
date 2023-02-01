import { Router } from '../../../../src/shared/infrastructure/Router';
import * as express from 'express';
import { ErrorMiddleware } from '../../../../src/shared/infrastructure/express/ErrorMiddleware';
import { ServerLogger } from '../../../../src/shared/infrastructure/logger';
import { mock } from 'jest-mock-extended';

describe('Router', () => {
  it('should return router', () => {
    // given

    const apiRouter = express.Router();
    const mockedServerLogger = mock<ServerLogger>();
    const errorMiddleware = new ErrorMiddleware(mockedServerLogger);

    // when
    const router = Router(apiRouter, errorMiddleware);

    // then
    expect(router).toBeDefined();
  });
});
