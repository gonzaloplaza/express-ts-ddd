import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../../../../../shared/domain/ErrorHandler';
import { CreateActivityService } from '../../../../application';

export class CreateActivityController {
  constructor(private createActivityService: CreateActivityService) {}

  public async invoke(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    this.validate(req, next);

    try {
      await this.createActivityService.invoke({
        type: req.body.type,
        content: req.body.content
      });
      return res.status(201).json(undefined);
    } catch (e) {
      next(new ErrorHandler('Error creating activity', 400));
    }
  }

  private validate(req: Request, next: NextFunction): boolean | any {
    if (!req.body.type || !req.body.content) {
      next(new ErrorHandler('Validation error', 400));
    } else {
      return true;
    }
  }
}
