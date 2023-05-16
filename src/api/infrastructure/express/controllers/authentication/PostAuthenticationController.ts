import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../../../../../shared/domain/ErrorHandler';
import { RequestValidator } from '../../../../../shared/infrastructure/express/RequestValidator';
import { body } from 'express-validator';
import {
  AuthenticationService,
  AuthenticationResponse
} from 'src/api/application/index';

export class PostAuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  public validate = [
    body('username').trim().normalizeEmail().isEmail().withMessage('must be a valid email address'),
    body('password').trim().isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
    RequestValidator
  ];

  public async invoke(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const authenticationResponse: AuthenticationResponse =
        await this.authenticationService.invoke({
          username: req.body.username,
          password: req.body.password
        });
      res.setHeader('Authorization', `Bearer ${authenticationResponse.accessToken}`);
      res.json(authenticationResponse).status(200);
    } catch (e) {
      next(new ErrorHandler('Invalid authentication', 401));
    }
  }
}
