const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { location_token } = require('../../config.json');
const { getAvailable, getUser } = require('../../models/tag.js');
const { weather_token } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggestion')
		.setDescription('Give idea on what to do')
		.addStringOption(option =>
			option.setName('location')
			.setDescription('Enter your location')
			.setRequired(false))
		.addStringOption(option =>
			option.setName('hobby')
			.setDescription('What kind of activity are you interested in?')
			.setRequired(false)),

	async execute(interaction) {

		//ppl available when the command is used.
		let peopleAvailable = await getAvailable(interaction);
		console.log(peopleAvailable);

		// if the amount of people available is < 2 then don't recommend anything.
		if(peopleAvailable.length < 2){
			await interaction.reply({content: `Not enough people to recommend a group activity. You need at least 2 people currently available for an activity recommendation.`, ephemeral: true});
			return;
		}

		//user who triggered command
		let user = await getUser(interaction);
		if (!user){
			await interaction.reply({content: `Please join the bot services.`, ephemeral: true});
			return;
		}

		//Location of the user that called the suggestion command.
		let zipCode = user.zipcode;
		if(!zipCode){
			await interaction.reply({content: `Please enter a valid zipcode into the bot before calling this command or run /suggestion with the zip option.`, ephemeral: true});
			return;
		}

		const geocodeUrl = `https://api.geoapify.com/v1/geocode/search?text=${zipCode}&apiKey=${location_token}`;
		
		//recording all of caller's hobbies.
		for (let i = 1; i < 6; i++) {
			if (user[`choice${i}`])
				console.log(user[`choice${i}`]);
		}
		
		

		console.log(`Randomly selected hobby: ${hobby}`); //print out the hobby selected.
		
		//const zipCode = interaction.options.getString('location');
		//const hobby = interaction.options.getString('hobby').toLowerCase();
		
		try{
			const geocodeResponse = await axios.get(geocodeUrl);
			const geocodeData = geocodeResponse.data;

			if(!geocodeData.features || !Array.isArray(geocodeData.features) || geocodeData.features.length === 0){
				await interaction.reply(`Could not find location for ZIP code ${zipCode}. Please try a different one.`);
				return;
			}

			//picking a random activity to do depending on the caller's five hobbies.
			let randomNum = Math.floor(Math.random() * 5) + 1;
			let hobby = user[`choice${randomNum}`];
			
			if(!hobby){//validate hobby selections
				await interaction.reply(`You do not have enough hobbies selected, please select at least 5.`);
				return;
			}
			
			const latitude = geocodeData.features[0].properties.lat;
            const longitude = geocodeData.features[0].properties.lon;

			//Finding weather based on caller's location
			const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${weather_token}&units=metric`);
			const weatherData = response.data;

			const temperature = weatherData.main.temp;
            const condition = weatherData.weather[0].description;
			// condition.includes('rain');
            const cityName = weatherData.name;

			const categoryMap = { // categories based on hobbies

				indoor: {
				'Shopping': 'commercial.second_hand',
				'Dining': 'catering.restaurant',
				'Movies': 'entertainment.cinema',
				'Nightlife': 'adult.nightclub',
				'Reading': 'commercial.books',
				'Watching TV Shows and Movies': 'entertainment.cinema',
				'Music': 'commercial.video_and_music',
				'Ice Skating': 'sport.ice_rink',
				'Cooking or Baking': 'commercial.supermarket',
				'Fashion and Styling': 'commercial.shopping_mall',
				'Volunteering': 'office.charity',
				'DIY Crafts': 'production.pottery',
				'Board Games': 'commercial.toy_and_game',
				'Gambling': 'adult.casino',
				},
				
				outdoor: {
				'Photography and Videography': 'natural.forest',
				'Exercising': 'sport.sports_centre',
				'Playing Sports': 'sport.fitness',
				'Camping': 'natural.forest',
				'Hiking and Nature Exploration': 'natural.protected_area',
				'Gardening': 'commercial.garden',
				},	
			};

			const category = categoryMap.outdoor[hobby];
			// if (!category) {
			// 	category = categoryMap.indoor[hobby];
			// }
			// if (!category) {
			// 	await interaction.reply(`Sorry, "${hobby}" is not a supported hobby.`);
			// 	return;
			// }

			const placesUrl = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${longitude},${latitude},5000&limit=5&apiKey=${location_token}`;
			const placesResponse = await axios.get(placesUrl);
			const places = placesResponse.data.features;

			//await interaction.reply(`The current weather in ${cityName} is ${temperature}°C with ${condition}. ${hobby}`); //used to display weather information.
			if (condition.includes('rain')) {
				// If it's raining or snowing, suggest an indoor hobby
				const indoorHobbies = Object.keys(categoryMap.indoor);
				selectedHobby = indoorHobbies[Math.floor(Math.random() * indoorHobbies.length)];
				await interaction.reply(`It's ${condition} in ${cityName}, so how about trying an indoor hobby like ${selectedHobby}? Remember to take an umbrella!`);
			} else if (temperature < 5) {
				// If the temperature is less than 5°C, recommend an indoor hobby and suggest a jacket
				const indoorHobbies = Object.keys(categoryMap.indoor);
				selectedHobby = indoorHobbies[Math.floor(Math.random() * indoorHobbies.length)];
				if(condition.includes('snow')){
					await interaction.reply(`It's ${condition}°C in ${cityName}, so how about trying an indoor hobby like ${selectedHobby}? Be careful and remember to stay warm!`);
				}
				else{
					await interaction.reply(`It's cold at ${temperature}°C in ${cityName}, so how about trying an indoor hobby like ${selectedHobby}? Don't forget to take a jacket!`);
				}
			} else if (temperature > 27) {
				// If the temperature is greater than 80°F (approximately 27°C), suggest staying hydrated
				const allHobbies = [...Object.keys(categoryMap.indoor), ...Object.keys(categoryMap.outdoor)];
				selectedHobby = allHobbies[Math.floor(Math.random() * allHobbies.length)];
				await interaction.reply(`It's quite hot at ${temperature}°C in ${cityName}, so stay hydrated! How about trying ${selectedHobby}?`);
			} else {
				// Otherwise, just recommend a hobby without any specific advice
				const allHobbies = [...Object.keys(categoryMap.indoor), ...Object.keys(categoryMap.outdoor)];
				selectedHobby = allHobbies[Math.floor(Math.random() * allHobbies.length)];
				await interaction.reply(`How about trying ${selectedHobby}?`);
			}

			if(places && Array.isArray(places) && places.length > 0){
				const suggestions = places.map(place => place.properties.name).join('\n');
				await interaction.reply(`Here are some suggestions for ${selectedHobby} near you:\n${suggestions}`);
			} else {
				await interaction.reply(`No suggestions found for ${selectedHobby} in this area.`);
			}
		} catch(error){
			console.error(error);
			await interaction.reply('An error occured while fetching suggestions.');
		}
	},
};