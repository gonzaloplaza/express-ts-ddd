import { Container } from '../../../../src/shared/infrastructure/Container';
import { Server } from '../../../../src/shared/infrastructure/Server';

const container = new Container();

describe('Server', () => {
  it('should initiate and stop a server instance', async () => {
    const server = container.invoke().resolve<Server>('server');
    jest.spyOn(server, 'start');
    jest.spyOn(server, 'stop');

    await server.start().then(() => {
      server.stop();
    });

    expect(server.start).toHaveBeenCalledTimes(1);
    expect(server.stop).toHaveBeenCalledTimes(1);
  });
});
