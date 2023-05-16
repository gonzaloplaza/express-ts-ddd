import { IUuidGenerator } from '../../../shared/domain/IUuidGenerator';
import { HealthCheckResponse } from './types'

export class HealthCheckService {
  constructor(private uuidGenerator: IUuidGenerator) {}

  public async invoke(): Promise<HealthCheckResponse> {
    return {
      id: this.uuidGenerator.generate(),
      success: true,
      date: new Date().toISOString()
    };
  }
}
