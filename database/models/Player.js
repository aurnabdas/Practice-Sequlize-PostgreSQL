const Sequelize = require('sequelize');
const db = require('../db');


const Player = db.define("players", {

  person: {
    type: Sequelize.STRING,
    allowNull: false
  },
  points:{
    type: Sequelize.INTEGER,
  }

});

module.exports = Player;