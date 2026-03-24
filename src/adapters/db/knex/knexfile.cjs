const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../../.env') });

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
      tableName: 'knex_migrations',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
