import express from 'express';
import { AddressInfo } from 'net';
import * as http from 'http';
import { Configuration } from '../../../config';
import { ServerLogger } from './logger';

export class Server {
  private readonly express: express.Application;
  private http: http.Server | any;

  constructor(
    private router: express.Router,
    private logger: ServerLogger,
    private config: Configuration
  ) {
    this.express = express();
    this.express.use(this.logger.stream());
    this.express.use(this.router);
  }

  public start = async (): Promise<void> => {
    return await new Promise<void>((resolve) => {
      this.http = this.express.listen(this.config.PORT, () => {
        const { port } = this.http.address() as AddressInfo;
        this.logger.info(`🚀 Application ${this.config.APP_NAME} running on PORT ${port}`);
        resolve();
      });
    });
  };

  public stop = async (): Promise<void> => {
    this.logger.info('Stopping http server...');
    await this.http.close();
  };

  public invoke = (): express.Application => this.express;
}
