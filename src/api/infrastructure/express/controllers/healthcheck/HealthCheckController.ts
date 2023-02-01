import { Request, Response } from 'express';
import { HealthCheckService } from '../../../../application';

export class HealthCheckController {
  constructor(private healthCheckService: HealthCheckService) {}

  public async invoke(req: Request, res: Response): Promise<Response> {
    return res.json(await this.healthCheckService.invoke());
  }
}
