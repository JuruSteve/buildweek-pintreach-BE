const db = require('../data/dbConfig.js');

module.exports = {
  add,
  findBy,
};

async function add(user) {
  const { username } = user;
  await db('users').insert(user);

  return db('users')
    .where({ username })
    .first();
}

function findBy(filter) {
  console.log(filter);
  return db('users')
    .where({ username: filter })
    .first();
}
