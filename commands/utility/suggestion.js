const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

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
		const location = interaction.options.getString('location');
		const hobby = interaction.options.getString('hobby');
		const [latitude, longitude] = location.split(',').map(coord => parseFloat(cord.trim()));

		const categoryMap = { // categories based on hobbies
			'shopping': 'commercial.supermarket'
		};

		const category = categoryMap[hobby.toLowerCase()]
		const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${longitude},${latitude},5000&limit=5&apiKey=${process.env.GEOAPIFY_API_KEY}`;

		try{
			const response = await axios.get(url);
			const places = response.data.features;

			if(places.length > 0){
				const suggestions = places.map(place => place.properties.name).join('\n');
				await interaction.reply(`Here are some suggestions for ${hobby} near you:\n${suggestions}`);
			} else {
				await interaction.reply(`No suggestions found for ${hobby} in this area`);
			}
		} catch(error){
			console.error(error);
			await interaction.reply(`An error occured while fetching suggestions.`);
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