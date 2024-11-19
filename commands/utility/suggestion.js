const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { location_token } = require('../../config.json');
const { getAvailable, getUser } = require('../../models/tag.js');

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
		let peopleAvailable = await getAvailable();
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
		
		//picking a random activity to do depending on the caller's five hobbies.
		let randomNum = Math.floor(Math.random() * 5) + 1;
		let hobby = user[`choice${randomNum}`];
		
		if(!hobby){//validate hobby selections
			await interaction.reply(`You do not have enough hobbies selected, please select at least 5.`);
			return;
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

			const latitude = geocodeData.features[0].properties.lat;
            const longitude = geocodeData.features[0].properties.lon;

			const categoryMap = { // categories based on hobbies
				
				'Shopping': 'commercial.supermarket',
				'Market': 'commercial.marketplace',
				'Dining': 'catering.restaurant',
				'Sports': 'activity.sport',
				'Arts': 'entertainment.culture.gallery',
				'Movies': 'entertainment.cinema',
				'Nightlife': 'adult.nightclub',
				'Reading': 'commercial.books',
				'Watching_TV_Shows_and_Movies': 'entertainment.cinema',
				'Music': 'commercial.video_and_music',
				'Exercising': 'sport.sports_centre',
				'Playing_Sports': 'sport.fitness',
				'Cooking_or_baking': 'commercial.supermarket',
				'Fashion_and_styling': 'commercial.shopping_mall',
				'Camping': 'natural.forest',
				'Hiking_and_nature_exploration': 'natural.protected_area',
				'Gardening': 'commercial.garden',
				'Board_Games': 'commercial.toy_and_game'
			};

			const category = categoryMap[hobby];
			if (!category) {
				await interaction.reply(`Sorry, "${hobby}" is not a recognized hobby.`);
				return;
			}

			const placesUrl = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${longitude},${latitude},5000&limit=5&apiKey=${location_token}`;
			const placesResponse = await axios.get(placesUrl);
			const places = placesResponse.data.features;

			if(places && Array.isArray(places) && places.length > 0){
				const suggestions = places.map(place => place.properties.name).join('\n');
				await interaction.reply(`Here are some suggestions for ${hobby} near you:\n${suggestions}`);
			} else {
				await interaction.reply(`No suggestions found for ${hobby} in this area.`);
			}
		} catch(error){
			console.error(error);
			await interaction.reply('An error occured while fetching suggestions.');
		}
	},
};