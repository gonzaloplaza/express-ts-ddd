import IUuidGenerator from '../../domain/IUuidGenerator';
import { v4 as uuidv4 } from 'uuid';

export class Uuidv4Generator implements IUuidGenerator {
    private uuidv4: typeof uuidv4;

    constructor() {
        this.uuidv4 = uuidv4;
    }

    public generate(): string {
        return this.uuidv4();
    }
}
