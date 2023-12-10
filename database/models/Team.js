const Sequelize = require('sequelize');
const db = require('../db');


const Team = db.define("teams", {

  Name: {
    type: Sequelize.STRING,
    allowNull: false
  }
  
});

module.exports = Team;