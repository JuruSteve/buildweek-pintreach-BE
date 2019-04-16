const db = require('../data/dbConfig.js');

module.exports = {
  add,
  findById,
};

async function add(article) {
  const { title, user_id } = article;
  await db('articles').insert(article);

  return db('articles')
    .where({ title, user_id })
    .first();
}

function findById(id) {
  return db('articles')
    .where({ id })
    .first();
}
