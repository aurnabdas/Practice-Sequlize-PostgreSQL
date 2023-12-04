const Sequelize = require('sequelize');
const db = require('../db');

const Console = db.define("console", {

  title: {
    type: Sequelize.STRING,
    allowNull: false
  },

  company: {
    type: Sequelize.STRING
  },

  year_founded: {
    type: Sequelize.STRING
  },


});

module.exports = Console;