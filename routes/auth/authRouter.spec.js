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

  it('should not allow duplicate registration', async () => {
    await request(server)
      .post('/auth/register')
      .send({
        username: 'KobeBryant',
        email: 'kobebryant@fakemail.com',
        password: 'test',
        name: 'Kobe Bryant',
      });
    const res = await request(server)
      .post('/auth/register')
      .send({
        username: 'KobeBryant',
        email: 'kobebryant@fakemail.com',
        password: 'test',
        name: 'Kobe Bryant',
      });

    expect(res.status).toBe(500);
    expect(res.body.errno).toBe(19); //SQLITE error 19 for duplicate of a unique column
  });

  it('should throw error status 406 if registration fields are incomplete ', async () => {
    const res = await request(server)
      .post('/auth/register')
      .send({
        username: 'KobeBryant',
        // email: 'kobebryant@fakemail.com',      commented out to simulate a missing email field
        password: 'test',
        name: 'Kobe Bryant',
      });

    expect(res.status).toBe(406);
  });
});

describe('login tests', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('login should fail with 401 invalid creds', async () => {
    await request(server)
      .post('/auth/register')
      .send({
        username: 'KobeBryant',
        email: 'kobebryant@fakemail.com',
        password: 'test',
        name: 'Kobe Bryant',
      });

    const login = await request(server)
      .post('/auth/login')
      .send({ username: 'KobeBryant', password: 'Lakers' });
    expect(login.status).toBe(401);
    expect(login.body.error).toEqual('Invalid Credentials. Please try again');
  });
});
