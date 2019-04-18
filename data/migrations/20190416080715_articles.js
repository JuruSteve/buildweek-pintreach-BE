exports.up = function(knex) {
  return knex.schema.createTable('articles', tbl => {
    tbl.increments();

    tbl
      .string('title', 300)
      .notNullable()
      .unique();
    tbl
      .string('url', 300)
      .notNullable()
      .unique();
    tbl.string('type', 300);
    tbl
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('articles');
};
