import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../../domain/ErrorHandler';

const DEFAULT_HTTP_ERROR_STATUS = 500;

const RouteNotFoundErrorHandler = (req: Request, res: Response): void => {
    res.status(404).send({ error: 404, message: 'Route not found' });
};

const ClientErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    next(err);
};

const CustomErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof ErrorHandler) {
        const { statusCode, message } = err;
        res.status(statusCode).json({
            status: statusCode,
            message: message
        });
    } else {
        next(err);
    }
};

const GlobalErrorHandler = (err: Error, req: Request, res: Response): void => {
    res.status(DEFAULT_HTTP_ERROR_STATUS).json({
        message: 'Something wrong happened :`(',
        status: DEFAULT_HTTP_ERROR_STATUS
    });
};

export { RouteNotFoundErrorHandler, ClientErrorHandler, CustomErrorHandler, GlobalErrorHandler };
