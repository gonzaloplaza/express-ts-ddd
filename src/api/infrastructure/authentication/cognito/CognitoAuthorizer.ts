import { Request, Response, NextFunction, RequestHandler as Middleware } from 'express';
import { ErrorHandler } from '../../../../shared/domain/ErrorHandler';
import { Configuration } from '../../../../../config';
import { CognitoJwtVerifier } from './CognitoJwtVerifier';
import { IAuthorizer } from '../../../domain/model/authentication/IAuthorizer';

export class CognitoAuthorizer implements IAuthorizer<Request, Response, NextFunction> {
  constructor(private config: Configuration, private jwtVerifier: CognitoJwtVerifier) {}

  public authorize: Middleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { authorization } = req.headers;

    const tokenArray = authorization !== undefined ? authorization.split(' ') : [];
    const token = tokenArray[1];

    try {
      await this.jwtVerifier.verify(token).then((validation) => {
        if (!validation.isValid) {
          // Invalid token
          return next(new ErrorHandler(`Unauthorized: ${validation.error}`, 401));
        }

        // Adds cognito userId to request headers
        req.headers.user_id = validation.userName;
        return next();
      });
    } catch (err: any) {
      return next(new ErrorHandler(`Unauthorized: ${err.message}`, 401));
    }
  };
}
