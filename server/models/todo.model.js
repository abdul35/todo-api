const { Sequelize, DataTypes } = require("sequelize");
const sequelize =require("../db_config/config")

const Todo = sequelize.define("todos", {
    id:{ 
        type:Sequelize.INTEGER, 
        autoIncrement:true, 
        allowNull:false, 
        primaryKey:true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
 });

module.exports = Todo

//  sequelize.sync().then(() => {
//     console.log('Todo table created successfully!');
//  }).catch((error) => {
//     console.error('Unable to create table : ', error);
//  });