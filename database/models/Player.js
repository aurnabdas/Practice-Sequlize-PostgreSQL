const Sequelize = require('sequelize');
const db = require('../db');


const Player = db.define("players", {

  person: {
    type: Sequelize.STRING,
    allowNull: false
  },
  points:{
    type: Sequelize.FLOAT(10,2)
  }

});

module.exports = Player;