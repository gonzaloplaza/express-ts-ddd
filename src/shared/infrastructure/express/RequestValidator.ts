import { NextFunction, Request, Response } from 'express';
import { ErrorFormatter, validationResult } from 'express-validator';

export const RequestValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const errorFormatter: ErrorFormatter = ({ msg, param }) => {
    return { parameter: param, message: msg };
  };
  const errors = validationResult(req).formatWith(errorFormatter).array({ onlyFirstError: true });
  if (errors.length > 0) {
    res.status(400).json({ errors: errors });
  }
  next();
};
