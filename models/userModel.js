const db = require('../data/dbConfig.js');

module.exports = {
  add,
};

async function add(user) {
  const [id] = await db('users').insert(user);

  return db('users')
    .where({ id })
    .first();
}

// function findBy(filter) {
//   return db('users')
//     .where({ id })
//     .first();
// }
