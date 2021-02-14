import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../../domain/ErrorHandler';
import { ILogger } from '../../domain/ILogger';

export class ErrorMiddleware {
  private defaultHttpErrorCode = 500;

  constructor(private logger: ILogger) {}

  public routeNotFoundErrorHandler = (req: Request, res: Response): void => {
    res.status(404).send({ error: 404, message: 'Route not found' });
  };

  public clientErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    next(err);
  };

  public customErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (err instanceof ErrorHandler) {
      this.logger.error(err.message);
      const { statusCode, message } = err;
      res.status(statusCode).json({
        status: statusCode,
        message: message
      });
    } else {
      next(err);
    }
  };

  public globalErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ): Response => {
    this.logger.error(err.message);
    return res.status(this.defaultHttpErrorCode).json({
      message: 'Something wrong happened :`(',
      status: this.defaultHttpErrorCode
    });
  };
}
