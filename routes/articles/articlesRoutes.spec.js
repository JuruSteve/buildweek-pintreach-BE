const request = require('supertest');

const db = require('../../data/dbConfig');
const server = require('../../api/server');

describe('article tests', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('able to add article after login, then delete', async () => {
    const register = await request(server)
      .post('/auth/register')
      .send({
        username: 'KobeBryant',
        email: 'kobebryant@fakemail.com',
        password: 'test',
        name: 'Kobe Bryant',
      });

    expect(register.status).toBe(201);

    const login = await request(server)
      .post('/auth/login')
      .send({ username: 'KobeBryant', password: 'test' });

    expect(login.body.token).toBeTruthy();

    const addArticle = await request(server)
      .post('/articles')
      .set({ authorization: login.body.token })
      .send({ title: 'test title', url: 'google.com', user_id: 1 });

    expect(addArticle.status).toBe(200);

    const deleteArticle = await request(server)
      .delete(`/articles/${addArticle.body.id}`)
      .set({ authorization: login.body.token });
    expect(deleteArticle.body.message).toEqual('article deleted');
  });
});
