import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../../../../../shared/domain/ErrorHandler';
import { RequestValidator } from '../../../../../shared/infrastructure/express/RequestValidator';
import { check } from 'express-validator';
import {
  AuthenticationService,
  AuthenticationResponse
} from 'src/api/application/authentication/AuthenticationService';

export class PostAuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  public async invoke(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const authenticationResponse: AuthenticationResponse = await this.authenticationService.invoke(
        {
          username: req.body.username,
          password: req.body.password
        }
      );
      res.setHeader('Authorization', 'Bearer ' + authenticationResponse.accessToken);
      res.status(200).json(authenticationResponse);
    } catch (e) {
      next(new ErrorHandler('Invalid authentication', 401));
    }
  }

  public validate = [
    check('username')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('must be a valid email address'),
    check('password').trim().isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
    RequestValidator
  ];
}
