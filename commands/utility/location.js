const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('location')
		.setDescription('current working location'),
	async execute(interaction) {
		await interaction.reply('Will reply with current zip code');
	},
};