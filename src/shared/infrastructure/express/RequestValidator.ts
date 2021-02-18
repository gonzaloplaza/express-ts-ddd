import { NextFunction, Request, Response } from 'express';
import { ErrorFormatter, validationResult } from 'express-validator';

export const RequestValidator = (req: Request, res: Response, next: NextFunction): any => {
  const errorFormatter: ErrorFormatter = ({ msg, param }) => {
    return `${param}: ${msg}`;
  };
  const errors = validationResult(req).formatWith(errorFormatter).array({ onlyFirstError: true });
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }
  next();
};
