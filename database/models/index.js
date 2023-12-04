const Console  = require('./Console');
const Game  = require('./Game');

Console.belongsTo(Game);
Game.hasMany(Console);

module.exports = {
  Console,
  Game
};