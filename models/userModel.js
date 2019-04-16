const db = require('../data/dbConfig.js');

module.exports = {
  add,
  findById,
  findBy,
};

async function add(user) {
  const { username } = user;
  await db('users').insert(user);

  return db('users')
    .where({ username })
    .first();
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findBy(filter) {
  return db('users')
    .where({ username: filter })
    .first();
}
