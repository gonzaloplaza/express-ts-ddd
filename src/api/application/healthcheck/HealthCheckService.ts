import IUuidGenerator from '../../../shared/domain/IUuidGenerator';

type HealthCheckResponse = {
    id: string;
    success: boolean;
    date: string;
};

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
