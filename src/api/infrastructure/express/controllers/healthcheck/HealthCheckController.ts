import { Request, Response } from 'express';
import { HealthCheckService } from '../../../../application/healthcheck/HealthCheckService';

export class HealthCheckController {
  constructor(private healthCheckService: HealthCheckService) {}

  public invoke(req: Request, res: Response): Response {
    return res.json(this.healthCheckService.invoke());
  }
}
