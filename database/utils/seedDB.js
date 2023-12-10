const { User, Team, Player } = require('../models');

const seedDB = async () => {
	const dummyUser= await User.create({
		user: "mahathir",
		pwd: "ilovehotdogs",
	});

    const dummyUser2= await User.create({
		user: "aurnab",
		pwd: "iloveicecream",
	});
	

    const dummyTeam = await Team.create({
        Name: "Boston",
        userId: dummyUser.id,
        
        
	});

    const dummyTeam2 = await Team.create({
        Name: "New York",
        userId: dummyUser2.id,
        

        
	});

    const dummyPlayer = await Player.create({
        person: "Jayson Tatum",
        points: 43,
        teamId: dummyTeam.id

        
        
	});

    const dummyPlayer2 = await Player.create({
        person: "Jalen Brunson",
        points: 38,
        teamId: dummyTeam2.id

	});

    // await dummyTeam.addPlayer(dummyPlayer);

    // let player =  Player.findAll({include:[Team]});
    // let ids = player.teams
    // console.log(ids)
    

    // the setUser is only aviable because of line 5 in index.js within models/index.js. 
    // this is because the foreign key of teams belong to users 
	// await dummyUser.setTeam(dummyTeam);

    // this is the correct one users to multiple team 
    // await dummyTeam.setUser(dummyUser);

    
	
}

module.exports = seedDB;