const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { location_token } = require('../../config.json');
const { getAvailable } = require('../../models/tag.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggestion')
		.setDescription('give idea on what to do')
		.addStringOption(option =>
			option.setName('location')
			.setDescription('Enter your location')
			.setRequired(true))
		.addStringOption(option =>
			option.setName('hobby')
			.setDescription('What kind of activity are you interested in?')
			.setRequired(true)),

	async execute(interaction) {
		const zipCode = interaction.options.getString('location');
		const hobby = interaction.options.getString('hobby').toLowerCase();

		const geocodeUrl = `https://api.geoapify.com/v1/geocode/search?text=${zipCode}&apiKey=${location_token}`;

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
				/*'shopping': 'commercial.supermarket',
				'market': 'commercial.marketplace',
				'dining': 'catering.restaurant',
				'sports': 'activity.sport',
				'arts': 'entertainment.culture.gallery',
				'movies': 'entertainment.cinema',
				'nightlife': 'adult.nightclub',
				'Reading': 'commercial.books',
				'Watching_TV_Shows_and_Movies': 'entertainment.cinema',
				'Music': 'commercial.video_and_music',
				'exercising': 'sport.fitness',
				'Photography_and_Videography': '',
				'Playing_Sports': 'sport.fitness',
				'Playing_Sports': 'sport.centre',
				'Cooking_or_Baking': 'commercial.supermarket',
				'Creative_Writing': '',
				'DIY_Crafts': '',
				'Skateboarding': '',
				'Rollerblading': '',
				'Fashion_and_Styling': 'commercial.shopping_mall',
				'Dancing': '',
				'Singing': '',
				'Camping': 'natural.forest',
				'Hiking_and_Nature_Exploration': 'natural.protected_area',
				'Gardening': 'commercial.garden',
				'Board_Games': 'commercial.toy_and_gamep',
				'Volunteering': '',
				'Meditation': ''*/

				'shopping': 'commercial.supermarket',
				'market': 'commercial.marketplace',
				'dining': 'catering.restaurant',
				'sports': 'activity.sport',
				'arts': 'entertainment.culture.gallery',
				'movies': 'entertainment.cinema',
				'nightlife': 'adult.nightclub',
				'reading': 'commercial.books',
				'watching_tv_shows_and_movies': 'entertainment.cinema',
				'music': 'commercial.video_and_music',
				'exercising': 'sport.fitness',
				'playing_sports': 'sport.centre',
				'cooking_or_baking': 'commercial.supermarket',
				'fashion_and_styling': 'commercial.shopping_mall',
				'camping': 'natural.forest',
				'hiking_and_nature_exploration': 'natural.protected_area',
				'gardening': 'commercial.garden',
				'board_games': 'commercial.toy_and_game'
				
			};

			const category = categoryMap[hobby]
			if (!category) {
				await interaction.reply(`Sorry, "${hobby}" is not a recognized hobby. Try one of these: shopping, market, dining, sports, arts, movies, nightlife.`);
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

// //https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect%3A10.716463143326969%2C48.755151258420966%2C10.835314015356737%2C48.680903341613316&limit=20&apiKey=e391a7e5c6144c83abfa40cfca71c114

// var config = {
//   method: 'get',
//   url: 'https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect%3A10.716463143326969%2C48.755151258420966%2C10.835314015356737%2C48.680903341613316&limit=20&apiKey=e391a7e5c6144c83abfa40cfca71c114',
//   headers: { }
// };

// axios(config)
// .then(function (response) {
//   console.log(response.data);
// })
// .catch(function (error) {
//   console.log(error);
// });


//geocode url for lat and lon
// https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=e391a7e5c6144c83abfa40cfca71c114