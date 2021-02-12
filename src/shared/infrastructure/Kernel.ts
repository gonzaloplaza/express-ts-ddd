import { Server } from './Server';

export class Kernel {
  private server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  public async start(): Promise<void> {
    await this.server.start();
  }
}
