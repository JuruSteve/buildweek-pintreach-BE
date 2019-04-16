const db = require('../data/dbConfig.js');

module.exports = {
  add,
  findBy,
};

async function add(article) {
  const { title, user_id } = article;
  await db('articles').insert(article);

  return db('articles')
    .where({ title, user_id })
    .first();
}

function findBy(filter) {
  console.log(filter);
  return db('articles')
    .where({ id: filter })
    .first();
}
