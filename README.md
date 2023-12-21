# Run Docker and Node

## install docker 
https://docs.docker.com/desktop/install/mac-install/
## run postgresql

ensure docker is installed and run the following code:

```bash  

docker run --name postgres -e POSTGRES_PASSWORD=mypass -e POSTGRES_USER=dev -p 5432:5432 -d postgres

```

## install node dependencies 
ensure node.js is installed and write the following command to install all the dependencies:

```
npm install

```

## run
to run the server write the following:
```
npm run dev
```
## how this project meets the requirements 

this is done in database/model/team.js, player.js and user.js
- we created three tables: Users, Teams, and Players
- User and Team are associated with each other and Team and Player are assocaited with each other

everything below is done from lines 20 to 216 in app.js
- their are routes that add to each table with a post request
- routes that return all the infromation on the table 
- there are put requests for all tables, based on id
- deletion for each user, team and player based on id
- and their are routes that return a specific instance of a model, including eveything they are associated with 

all this is done from lines 20 to 216 in app.js
