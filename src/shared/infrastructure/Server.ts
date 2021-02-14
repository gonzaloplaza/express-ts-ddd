import express from 'express';
import morgan from 'morgan';
import { AddressInfo } from 'net';
import { Configuration } from '../../../config';

export class Server {
  private express: express.Application;

  constructor(private router: express.Router, private config: Configuration) {
    this.express = express();
    this.express.use(morgan('tiny'));
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
}
