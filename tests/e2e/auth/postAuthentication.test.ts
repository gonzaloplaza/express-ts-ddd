import request from 'supertest';
import { app } from '../bootstrap';
import faker from 'faker';

describe('POST /auth', () => {
  it('should get 401 response invalid authentication', async () => {
    const res = await request(app).post('/auth').send({
      username: faker.internet.exampleEmail(),
      password: faker.internet.password()
    });

    expect(res.status).toEqual(401);
  });

  it('should get 400 response no validation passed', async () => {
    const res = await request(app).post('/auth').send({
      username: ''
    });

    expect(res.status).toEqual(400);
  });
});
