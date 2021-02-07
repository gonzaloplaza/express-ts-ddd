import { HealthCheckResponse } from './HealthCheckResponse';
import IUuidGenerator from '../../../shared/domain/IUuidGenerator';

export class HealthCheckService {
    constructor(private uuidGenerator: IUuidGenerator) {}

    public invoke(): HealthCheckResponse {
        return {
            id: this.uuidGenerator.generate(),
            success: true,
            date: new Date().toISOString()
        };
    }
}
