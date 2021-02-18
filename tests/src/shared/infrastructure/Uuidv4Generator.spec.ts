import { Uuidv4Generator } from '../../../../src/shared/infrastructure/uuid';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

const service = new Uuidv4Generator();

describe('Uuidv4 generator', () => {
  it('should obtain a valid uuidv4 string value', () => {
    const uuid: string = service.generate();
    expect(typeof uuid).toBe('string');
    expect(uuidValidate(uuid)).toBeTruthy();
    expect(uuidVersion(uuid)).toBe(4);
  });
});
