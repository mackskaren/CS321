const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('current weather information'),
	async execute(interaction) {
		await interaction.reply('will reply with current weather information for the current location');
	},
};