const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('GET / to base url', () => {
    it('should respond 200 OK status', async () => {
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
    });
    it('should return json object', async () => {
      const res = await request(server).get('/');
      expect(res.type).toBe('application/json');
    });
    it("should return { message: 'sanity check passed!' }", async () => {
      const res = await request(server).get('/');
      expect(res.body).toEqual({ message: 'sanity check passed!' });
    });
  });
});
