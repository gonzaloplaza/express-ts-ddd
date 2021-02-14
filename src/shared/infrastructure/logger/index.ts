import { ILogger } from 'src/shared/domain/ILogger';
import { createLogger, format, transports, Logger } from 'winston';
import { Configuration } from '../../../../config';

export class WinstonLogger implements ILogger {
  private logger: Logger;

  constructor(private config: Configuration) {
    this.logger = createLogger({
      level: this.config.APP_LOG_LEVEL || 'debug',
      format: format.json(),
      transports: [
        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/combined.log', level: 'info' })
      ],
      exitOnError: false
    });
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public error(message: string): void {
    this.logger.info(message);
  }

  public warning(message: string): void {
    this.logger.warn(message);
  }

  public critical(message: string): void {
    this.logger.crit(message);
  }
}
