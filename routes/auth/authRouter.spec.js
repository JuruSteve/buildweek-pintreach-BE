const request = require('supertest');

const db = require('../../data/dbConfig');
const server = require('../../api/server');

describe('register tests', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });
  it('should fail with status 406', async () => {
    const res = await request(server)
      .post('/auth/register')
      .send({ username: 'thisShouldFail' });
    expect(res.status).toBe(406);
  });
  it('should register successfully and then subsequently login successfully', async () => {
    const res = await request(server)
      .post('/auth/register')
      .send({
        username: 'KobeBryant',
        email: 'kobebryant@fakemail.com',
        password: 'test',
        name: 'Kobe Bryant',
      });
    expect(res.status).toBe(201);
    const login = await request(server)
      .post('/auth/login')
      .send({ username: 'KobeBryant', password: 'test' });
    expect(login.status).toBe(202);
    expect(login.body.message).toEqual('welcome KobeBryant');
    expect(login.body.id).toEqual(1);
    expect(login.body.token).toBeTruthy();
  });
});
