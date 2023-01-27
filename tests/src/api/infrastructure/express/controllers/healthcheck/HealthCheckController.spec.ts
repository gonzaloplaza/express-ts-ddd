import { HealthCheckController } from '../../../../../../../src/api/infrastructure/express/controllers';
import { createMock } from 'ts-auto-mock';
import { HealthCheckService } from '../../../../../../../src/api/application';
import { Request, Response } from 'express';

describe('Healthcheck Controller', () => {
  it('should invoke HealthCheck Controller', () => {
    // given
    const mockedHealthCheckService = createMock<HealthCheckService>({
      invoke: jest.fn().mockResolvedValueOnce({})
    });
    const mockedRequest = {} as Request;
    const mockedResponse = createMock<Response>({
      json: jest.fn()
    });
    const healthCheckController = new HealthCheckController(mockedHealthCheckService);

    // when
    healthCheckController.invoke(mockedRequest, mockedResponse);

    // then
    expect(mockedHealthCheckService.invoke).toHaveBeenCalledTimes(1);
    expect(mockedResponse.json).toHaveBeenCalledTimes(1);
  });
});
