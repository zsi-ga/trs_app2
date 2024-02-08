const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost:3306',
  dialect: 'mysql'
});

module.exports = sequelize;
