import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../../../../../shared/domain/ErrorHandler';
import { CreateActivityService } from '../../../../application';

export class CreateActivityController {
  constructor(private createActivityService: CreateActivityService) {}

  public async invoke(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      this.validate(req);
      await this.createActivityService.invoke({
        type: req.body.type,
        content: req.body.content
      });
      return res.status(201).json(undefined);
    } catch (e) {
      next(new ErrorHandler('Validation error', 400));
    }
  }

  private validate(req: Request): boolean {
    if (!req.body.type || !req.body.content) {
      throw new Error('Validation error');
    } else {
      return true;
    }
  }
}
