const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define("users", {

  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true 
    
  },

  user: {
    type: Sequelize.STRING,
    allowNull: false
  },

  pwd: {
    type: Sequelize.STRING,
    allowNull: false
  },

 

});

module.exports = User;