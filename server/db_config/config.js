const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todos', 'MYSQL_USER', 'MYSQL_PASSWORD', {
  host: 'localhost',
  port: "9906",
  dialect: 'mysql',
//   logging: (...msg) => console.log(msg)
});

module.exports = sequelize;