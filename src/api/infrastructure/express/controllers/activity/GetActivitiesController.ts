import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../../../../../shared/domain/ErrorHandler';
import { GetActivitiesService } from '../../../../application';

export class GetActivitiesController {
  constructor(private getActivitiesService: GetActivitiesService) {}

  public async invoke(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      return res.json(await this.getActivitiesService.invoke());
    } catch (err) {
      next(new ErrorHandler(err.message, 400));
    }
  }
}
