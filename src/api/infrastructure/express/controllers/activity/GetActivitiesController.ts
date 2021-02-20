import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../../../../../shared/domain/ErrorHandler';
import { GetActivitiesService } from '../../../../application';
import { header } from 'express-validator';
import { RequestValidator } from '../../../../../shared/infrastructure/express/RequestValidator';

export class GetActivitiesController {
  constructor(private getActivitiesService: GetActivitiesService) {}

  public validate = [header('user_id').notEmpty(), RequestValidator];

  public async invoke(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      return res.json(await this.getActivitiesService.invoke());
    } catch (err) {
      next(new ErrorHandler(err.message, 400));
    }
  }
}
