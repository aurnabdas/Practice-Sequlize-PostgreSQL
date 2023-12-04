const { Game, Console } = require('../models');

const seedDB = async () => {
	const dummyGame = await Game.create({
		title: "Halo 2",
		date: "November 9, 2004",
		rating: "9"
	});
	const dummyGame2 = await Game.create({
		title: "Call Of Duty 3",
		date: "November 7, 2006",
        rating: "8"
	});

    const dummyGame3 = await Game.create({
		title: "Marvel's Spider-Man",
		date: "September 7, 2018",
        rating: "10"
	});

	const dummyConsole = await Console.create({
		title: "Xbox",
        company: "Microsoft",
        year_founded: "April 4, 1975"
        
	});

    const dummyConsole2 = await Console.create({
		title: "Playstation",
        company: "Sony",
        year_founded: "May 7, 1946"
        
	});
    

	await dummyConsole.setGame(dummyGame);
	
}

module.exports = seedDB;