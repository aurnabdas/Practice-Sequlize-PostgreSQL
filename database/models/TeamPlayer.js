const Sequelize = require('sequelize');
const db = require('../db');
const { Team, Player } = require('../models');




// const TeamPlayer = db.define('teamplayer', {
//     TeamId: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: teams, // 'Movies' would also work
//         key: 'id'
//       }
//     },
//     PlayerId: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: player, // 'Actors' would also work
//         key: 'id'
//       }
//     }
//   });

//   module.exports = TeamPlayer;