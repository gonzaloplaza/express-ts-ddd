import { ILogger } from 'src/shared/domain/ILogger';
import { createLogger, format, transports, Logger } from 'winston';
import { Configuration } from '../../../../config';
import appRoot from 'app-root-path';
import path from 'path';
import fs from 'fs';
import morgan from 'morgan';
import { Handler } from 'express';

export class ServerLogger implements ILogger {
  private logger: Logger;
  private logsDirectory: string;

  constructor(private config: Configuration) {
    this.logsDirectory = path.resolve(`${appRoot}`, 'logs');
    fs.existsSync(this.logsDirectory) || fs.mkdirSync(this.logsDirectory);

    const options = {
      infofile: {
        level: 'info',
        filename: path.resolve(this.logsDirectory, 'info.log'),
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5
      },
      errorfile: {
        level: 'error',
        filename: path.resolve(this.logsDirectory, 'error.log'),
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5
      }
    };

    const loggerTransports = {
      console: new transports.Console({
        format: format.combine(format.colorize(), format.simple())
      }),
      info: new transports.File(options.infofile),
      error: new transports.File(options.errorfile)
    };

    this.logger = createLogger({
      level: this.config.APP_LOG_LEVEL || 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      transports: [loggerTransports.console, loggerTransports.info, loggerTransports.error],
      exitOnError: false
    });
  }

  public stream(): Handler {
    return morgan('combined', {
      stream: {
        write: (message: string): void => {
          this.info(message.trim());
        }
      }
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
