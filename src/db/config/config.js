const path = require('path');
const storage = path.join(__dirname, '../../../db.sqlite');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory'
  },
  production: {
    use_env_variable: 'DB_CONNECTION_STRING',
    dialect: 'mysql',
    logging: false
  }
};