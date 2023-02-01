import { Router as ExpressRouter } from 'express';
import { createMock } from 'ts-auto-mock';
import { Server } from '../../../../src/shared/infrastructure/Server';
import { ServerLogger } from '../../../../src/shared/infrastructure/logger';
import { config } from '../../../../config';

describe('Server', () => {
  const mockedServerLogger = createMock<ServerLogger>();
  const server = new Server(ExpressRouter(), mockedServerLogger, config);

  it('should return an express Application instance', () => {
    // when
    const app = server.invoke();

    // then
    expect(app).toBeDefined();
  });

  it('should initiate and stop a server instance', async () => {
    // given
    jest.spyOn(server, 'start');
    jest.spyOn(server, 'stop');

    // when
    await server.start();
    await server.stop();

    // then
    expect(server.start).toHaveBeenCalledTimes(1);
    expect(server.stop).toHaveBeenCalledTimes(1);
  }, 1000);
});
