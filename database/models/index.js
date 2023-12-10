const User  = require('./User');
const Team  = require('./Team');
const Player = require('./Player')


// this is one to many as in each player has a specific team 
// User.belongsTo(Team);    // user table will have the foreign key for team 
// Team.hasMany(User); 

// this is many to one: as in one player has multiple teams
// User.hasMany(Team);  // A User can have multiple teams
// Team.belongsTo(User); // Each team belongs to a single User
User.hasOne(Team);
Team.belongsTo(User);


Team.belongsToMany(Player, { through: "TeamPlayer" })
Player.belongsToMany(Team, { through: "TeamPlayer" })




// i want to look more into the code above 

module.exports = {
  User,
  Team,
  Player
};

// to check the list of tables you have in postgresql make sure you are in the webdevbackend database and type \dt
// to check specific tables type SELECT* from nameoftable; in the command line
// \l gives you the list of databases 
// \q to quit after you made a SELECT* from nameoftable; statment