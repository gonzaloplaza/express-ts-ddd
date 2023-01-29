import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../../../../../shared/domain/ErrorHandler';
import { CreateActivityService } from '../../../../application';
import { RequestValidator } from '../../../../../shared/infrastructure/express/RequestValidator';
import { body } from 'express-validator';

export class CreateActivityController {
  constructor(private createActivityService: CreateActivityService) {}

  public validate = [body(['type', 'content']).notEmpty(), RequestValidator];

  public async invoke(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.createActivityService.invoke({
        type: req.body.type,
        content: req.body.content
      });

      return res.json().status(201);
    } catch (e) {
      next(new ErrorHandler('Error creating activity', 400));
    }
  }
}
