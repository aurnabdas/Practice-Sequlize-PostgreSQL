const { User, Team } = require('../models');

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
		PG: "Ja Morant",
        SG: "Cam Thomas",
        G: "Tyrese Haliburton",
        SF: "Lebron James",
        PF: "Domantas Sabonis",
        C1: "Nikola Jokic",
        C2: "Joel Embid",
        C3: "Rudy Golbert",
        Any1: "Jalen Brunson",
        Any2: "Joe Ingles",
        userId: dummyUser.id
        
        
	});

    const dummyTeam2 = await Team.create({
        Name: "New York",
		PG: "Trae Young",
        SG: "Klay Thompson",
        G: "Tyrese Haliburton",
        SF: "Kevin Durant",
        PF: "Chet Holmgren",
        C1: "Brook Lopez",
        C2: "Joel Embid",
        C3: "Rudy Golbert",
        Any1: "Kawhi Leonard",
        Any2: "Jayson Tatum",
        userId: dummyUser2.id
        
	});
    

    // the setUser is only aviable because of line 5 in index.js within models/index.js. 
    // this is because the foreign key of teams belong to users 
	// await dummyUser.setTeam(dummyTeam);

    // this is the correct one users to multiple team 
    // await dummyTeam.setUser(dummyUser);

    
	
}

module.exports = seedDB;