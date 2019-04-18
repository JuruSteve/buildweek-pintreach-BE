const request = require('supertest');
// const jwt = require('jsonwebtoken');

// const db = require('../../data/dbConfig');
const server = require('../../api/server');

describe('register tests', () => {
  it('should fail with status 406', async () => {
    const res = await request(server)
      .post('/auth/register')
      .send({ username: 'thisShouldFail' });
    expect(res.status).toBe(406);
  });
});
