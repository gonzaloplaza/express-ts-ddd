import { Request, Response } from 'express';
import { GetActivitiesService } from '../../../../application';

export class GetActivitiesController {
    constructor(private getActivitiesService: GetActivitiesService) {}

    public async invoke(req: Request, res: Response): Promise<Response> {
        return res.json(await this.getActivitiesService.invoke());
    }
}
