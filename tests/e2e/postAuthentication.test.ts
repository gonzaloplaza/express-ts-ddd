import request from 'supertest';
import { app } from './bootstrap';
import faker from 'faker';

describe('POST /auth', () => {
  it('should get 200 response with token', async () => {
    const res = await request(app).post('/auth').send({
      username: faker.internet.email(),
      password: faker.internet.password()
    });

    expect(res.status).toEqual(401);
  });
});
