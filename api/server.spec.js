const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  it('should respond 200 OK status', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
  });
});
