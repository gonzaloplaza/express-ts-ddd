import { Container } from '../../../src/shared/infrastructure/Container';
import { Uuidv4Generator } from '../../../src/shared/infrastructure/uuid';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

const container = new Container();
const service = container.invoke().resolve<Uuidv4Generator>('uuidGenerator');

describe('Uuidv4 generator', () => {
    it('should obtain a valid uuidv4 string value', () => {
        const uuid: string = service.generate();
        expect(typeof uuid).toBe('string');
        expect(uuidValidate(uuid)).toBe(true);
        expect(uuidVersion(uuid)).toBe(4);
    });
});
