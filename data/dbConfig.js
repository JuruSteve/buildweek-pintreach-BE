const knex = require('knex');
const config = require('../knexfile.js');

//points to production postgres db upon deployemnt, developmemnt config otherwise
const dbEnv = process.env.DB_ENV || 'development';

module.exports = knex(config[dbEnv]);
