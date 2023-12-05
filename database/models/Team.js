const Sequelize = require('sequelize');
const db = require('../db');
const User  = require('./User');

const Team = db.define("teams", {

  Name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  PG: {
    type: Sequelize.STRING,
  },
  SG: {
    type: Sequelize.STRING,
  },
  G: {
    type: Sequelize.STRING,
  },
  SF: {
    type: Sequelize.STRING,
  },
  PF: {
    type: Sequelize.STRING,
  },
  C1: {
    type: Sequelize.STRING,
  },
  C2: {
    type: Sequelize.STRING,
  },
  C3: {
    type: Sequelize.STRING,
  },
  Any1: {
    type: Sequelize.STRING,
  },
  Any2: {
    type: Sequelize.STRING,
  }
  

});

module.exports = Team;