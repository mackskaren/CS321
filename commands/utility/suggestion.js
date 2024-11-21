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
		// if(peopleAvailable.length < 2){
		// 	await interaction.reply({content: `Not enough people to recommend a group activity. You need at least 2 people currently available for an activity recommendation.`, ephemeral: true});
		// 	return;
		// }

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
		
		
		//const zipCode = interaction.options.getString('location');
		//const hobby = interaction.options.getString('hobby').toLowerCase();
		
		try{
			const geocodeResponse = await axios.get(geocodeUrl);
			const geocodeData = geocodeResponse.data;

			if(!geocodeData.features || !Array.isArray(geocodeData.features) || geocodeData.features.length === 0){
				await interaction.reply(`Could not find location for ZIP code ${zipCode}. Please try a different one.`);
				return;
			}
			
			//Finding weather based on caller's location
			const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${weather_token}&units=metric`);
			const weatherData = response.data;

			const temperature = weatherData.main.temp;
            const condition = weatherData.weather[0].description;
            const cityName = weatherData.name;

			//location stuff
			const latitude = geocodeData.features[0].properties.lat;
            const longitude = geocodeData.features[0].properties.lon;

			function changeHobby(type) {
				for(let i = 1; i <= 5; i++){
					const userHobby = user[`choice${i}`];
					if (type === 'indoor' && categoryMap.indoor[userHobby]) {
						return userHobby;
					}
					if(type == 'outdoor' && categoryMap.outdoor[userHobby]) {
						return userHobby;
					}
				}
				return null;
			}
			
			const categoryMap = { // categories based on hobbies
				indoor: {
				'Shopping': 'commercial.supermarket',
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
			
			//picking a random activity to do depending on the caller's five hobbies.
			let randomNum = Math.floor(Math.random() * 5) + 1;
			let hobby = user[`choice${randomNum}`];
			console.log(`Randomly selected hobby: ${hobby}`); //print out the hobby selected.
			
			if(!hobby){//validate hobby selections
				await interaction.reply(`You do not have enough hobbies selected, please select at least 5.`);
				return;
			}
			
			//Here we need a way of checking to see if the selected hobby is indoor or outdoor.
			// Categorize the hobby as indoor or outdoor
			const isIndoorHobby = categoryMap.indoor[hobby] !== undefined;
			const isOutdoorHobby = categoryMap.outdoor[hobby] !== undefined;
			
			//await interaction.reply(`The current weather in ${cityName} is ${temperature}°C with ${condition}. ${hobby}`); //used to display weather information.
			// Check weather conditions and update the hobby if necessary
			await interaction.deferReply();
			let answer = '';
			if (condition.includes('rain') || condition.includes('snow') || condition.includes('storm')) {
				//If it's raining or snowing, an indoor hobby is required
				if (!isIndoorHobby) {
					hobby = changeHobby('indoor');
				}
				//snowing
				if(condition.includes('snow')){
					answer += `It's ${condition} in ${cityName}. How about trying ${hobby}? Remember to dress warm and stay safe!\n`;
					// await interaction.reply(`It's ${condition} in ${cityName}. How about trying ${hobby}? Remember to dress warm and stay safe!`);
				}
				//Raining
				else{
					answer += `It's ${condition} in ${cityName}. How about trying ${hobby}? Remember to take an umbrella!\n`;
					// await interaction.reply(`It's ${condition} in ${cityName}. How about trying ${hobby}? Remember to take an umbrella!`);
				}
			} else if (temperature < 5) {
				//If the temperature is below 5°C, recommend an indoor hobby and suggest a jacket
				if (!isIndoorHobby) {
					hobby = changeHobby('indoor');
				}
				answer += `It's cold at ${temperature}°C in ${cityName}. How about trying ${hobby}? Don't forget to take a jacket!\n`;
				// await interaction.reply(`It's cold at ${temperature}°C in ${cityName}. How about trying ${hobby}? Don't forget to take a jacket!`);
			} else if (temperature > 27) {
				//If the temperature is above 80°F (around 27°C), suggest staying hydrated
				answer += `It's quite hot at ${temperature}°C in ${cityName}. Stay hydrated! How about trying ${hobby}?\n`;
				// await interaction.reply(`It's quite hot at ${temperature}°C in ${cityName}. Stay hydrated! How about trying ${hobby}?`);
			} else {
				//If none of the above conditions are met, keep the selected hobby
				answer += `It's nice in ${cityName} and is currently ${temperature}°C. How about trying ${hobby}?\n`;
				// await interaction.reply(`It's nice in ${cityName} and is currently ${temperature}°C. How about trying ${hobby}?`);
			}

			let category = categoryMap.indoor[hobby];
			if (!category) category = categoryMap.outdoor[hobby];
			if (!category) {
				await interaction.editReply(`Sorry, "${hobby}" is not supported.`);
				return;
			}

			const placesUrl = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${longitude},${latitude},20000&limit=5&apiKey=${location_token}`;
			const placesResponse = await axios.get(placesUrl);
			const places = placesResponse.data.features;

			//Finding places near you of the selected hobby
			if(places && Array.isArray(places) && places.length > 0){
				const suggestions = places.map(place => place.properties.name).join('\n');
				answer += `Here are some suggestions for ${hobby} near you:\n${suggestions}\n`;
				// await interaction.followUp(`Here are some suggestions for ${hobby} near you:\n${suggestions}`);
			} else {
				answer += `No suggestions found for ${hobby} in your area.\n`;
				// await interaction.followUp(`No suggestions found for ${hobby} in this area.`);
			}
			answer += `\nPeople who can tag along:\n${peopleAvailable.map(entry => entry.name).join('\n')}`;

			await interaction.editReply(answer);
		// error handling
		} catch(error){
			console.error(error);
			await interaction.reply('An error occured while fetching suggestions.');
		}
	},
};