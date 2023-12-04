const createDB = require('./database/utils/createDB');
const seedDB = require('./database/utils/seedDB');
const { Console, Game } = require('./database/models');
const ash = require('express-async-handler');

const db = require('./database');

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

const configureApp = async () => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.get('/favicon.ico', (req, res) => res.status(204));


 



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