const createDB = require('./database/utils/createDB');
const seedDB = require('./database/utils/seedDB');
const { User, Team , Player} = require('./database/models');
const ash = require('express-async-handler');

const db = require('./database');


const corsOptions = {
  origin: 'http://localhost:3000', // Client app's URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

//sync and seed
const syncDatabase = async () => {
  try {
    //the {force: true} option will clear the database tables, when you restart 
    
    //remove the option if you want the data to persist

    await db.sync({force: true});
    console.log('------Synced to db--------')
    await seedDB();
    console.log('--------Successfully seeded db--------');
  } catch (err) {
    console.error('syncDB error:', err);
  }  
}

const express = require("express");
const app = express();
const cors = require('cors')

const handleLogin = require('./middlware/auth');



const configureApp = async () => {
  app.use(cors(corsOptions)); // Use CORS with configured options
  app.options('*', cors(corsOptions)); // Enable preflight requests for all routes


  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.get('/favicon.ico', (req, res) => res.status(204));


 
  app.get("/hello", (request, response) => {
    response.send("hello world!")
  });
 
app.post('/auth', handleLogin);
  //user routes

  app.get('/user/', ash(async(req, res) => {
    let user = await User.findAll();
    res.status(200).json(user);
  }));

  //get specific user
  app.get('/user/:id', ash(async(req,res) =>{
    let user = await User.findByPk(req.params.id, {include:[Team]}); // based on the value from :id, we will get that specific instance
    res.status(200).json(user)
  }));

   //adding new user 
   app.post('/user', function(req,res,next){
    User.create(req.body).then(createdUser => res.status(200).json(createdUser))
    .catch(err => next(err))
  })

 //changes in user password or username
  app.put('/user/:id', ash(async(req, res) => {
    await User.update(req.body,
          { where: {id: req.params.id} }
    );
    let user = await User.findByPk(req.params.id);
    res.status(201).json(user);
  }));   

  //deleting an user
  app.delete('/user/:id', function(req, res, next) {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => res.status(200).json("Deleted a user!"))
      .catch(err => next(err));
  });

  // team routes

  //get all the team's from team table
  app.get('/team/', ash(async(req, res) => {
    let team = await Team.findAll();
    res.status(200).json(team);
  }));

  //get specific team
  app.get('/team/:id', ash(async(req,res) =>{
    let team = await Team.findByPk(req.params.id, {include:[User]}); // based on the value from :id, we will get that specific instance
    res.status(200).json(team)
  }));

  //adding new team 
  app.post('/team', function(req,res,next){
    Team.create(req.body).then(createdTeam => res.status(200).json(createdTeam))
    .catch(err => next(err))
  })

// this creates a team for the user that is currently logged in and also links it to the current user
  app.post('/userteamlink', async (req, res, next) => {
    const { userId, teamInfo } = req.body; // Assuming teamInfo contains the team data

    try {
        // First check if the user is in the database
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Create a new team and associate user
        const createdTeam = await Team.create({ ...teamInfo, userId: user.id });

        res.status(200).json(createdTeam);
    } catch (err) {
        next(err);
    }
});


  //changes the player on a team
  app.put('/team/:id', ash(async(req, res) => {
    await Team.update(req.body,
          { where: {id: req.params.id} }
    );
    let team = await Team.findByPk(req.params.id);
    res.status(201).json(team);
  }));

  //deleting an entire team
  app.delete('/team/:id', function(req, res, next) {
    Team.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => res.status(200).json("Deleted a team!"))
      .catch(err => next(err));
  });

  // this deletes a specific player on a specific team 
  app.delete('/team/:id/:position', function(req, res, next) {
    const position = req.params.position
    const teamid = req.params.id


    Team.update(

        {[position]: null},
        {where: {id:teamid }},

    )
      .then(() => res.status(200).json("Deleted a Point Guard!"))
      .catch(err => next(err));
  });

  
  
 
//player 

app.get('/player/', ash(async(req, res) => {
  let player = await Player.findAll();
  res.status(200).json(player);
}));

  //adding new player 
  app.post('/player', function(req,res,next){
    let team = Team.create(req.body).then(createdTeam => res.status(200).json(createdTeam))
    .catch(err => next(err))

  })

// to check what player is in what team 
app.get('/junction/', ash(async(req, res) => {
  let team = await Team.findAll({include:[Player]});
  
  
  res.status(200).json(team);
}));

// this creates/checks if a player is already in the database, then it will add this person's team
app.post('/createPlayerAndAddToTeam', async (req, res) => {
  const { teamId, playerData } = req.body; // playerData contains the details of the player to be created or found

  try {
      // Define the criteria to check for an existing player
      // It's important that this checks a unique field, such as a player name or ID
      const playerCriteria = { person: playerData.person }; // Example: Use a unique field like playerName

      // Check if the player exists or create a new one
      const [player, created] = await Player.findOrCreate({
          where: playerCriteria,
          defaults: playerData // used for creating the player if not found
      });

      // Find the team and add the player to it
      const team = await Team.findByPk(teamId);
      if (!team) {
          return res.status(404).send('Team not found');
      }

      await team.addPlayer(player);

      // Response message indicating whether the player was created or already existed
      const message = created ? 'Player created and added to team' : 'Player already existed and was added to team';

      res.status(200).json({ message, player });
  } catch (error) {
      res.status(500).send(error.message);
  }
});





  // Handle page not found:
  app.use((req, res, next) => {
    const error = new Error("Not Found, Please Check URL!");
    error.status = 404;
    next(error);
  });

  // Error-handling middleware: 
  app.use((err, req, res, next) => {
    console.error(err);
    console.log(req.originalUrl);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });

};

const bootApp = async () => {
  //creates local database if it doesn't exist
  await createDB();

  //calls sync which is a Sequelize method that creates the database tables
  //calls seedDB which will insert initial data into the tables
  await syncDatabase();

  //express setup - define routes and middleware
  await configureApp();
};


// PROGRAM STARTS HERE


bootApp();


const PORT = 5001;
app.listen(PORT, console.log(`Server started on ${PORT}`));