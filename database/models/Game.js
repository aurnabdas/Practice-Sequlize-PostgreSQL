const Sequelize = require('sequelize');
const db = require('../db');

const Game = db.define("game", {

  title: {
    type: Sequelize.STRING,
    allowNull: false
  },

  date: {
    type: Sequelize.STRING,
    allowNull: false
  },

  rating: {
    type: Sequelize.STRING,
  },

  imageUrl: {
    type: Sequelize.STRING,
  }


});

module.exports = Game;