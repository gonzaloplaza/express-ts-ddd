import { Server } from '../../../../src/shared/infrastructure/Server';
import { Router as ExpressRouter } from 'express';
import { ServerLogger } from '../../../../src/shared/infrastructure/logger';
import { config } from '../../../../config';

describe('Server', () => {
  it('should initiate and stop a server instance', async () => {
    // given
    const server = new Server(ExpressRouter(), new ServerLogger(config), config);
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
