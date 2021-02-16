import express from 'express';
import { AddressInfo } from 'net';
import { Configuration } from '../../../config';
import { ServerLogger } from './logger';

export class Server {
  private express: express.Application;

  constructor(
    private router: express.Router,
    private logger: ServerLogger,
    private config: Configuration
  ) {
    this.express = express();
    this.express.use(this.logger.handle());
    this.express.use(this.router);
  }

  public async start(): Promise<void> {
    return new Promise<void>((resolve) => {
      const http = this.express.listen(this.config.PORT, () => {
        const { port } = http.address() as AddressInfo;
        console.log(`🚀 Application ${this.config.APP_NAME} running on PORT ${port}`);
        resolve();
      });
    });
  }

  public invoke(): express.Application {
    return this.express;
  }
}
