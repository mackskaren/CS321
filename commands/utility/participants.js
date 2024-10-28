const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('participants')
		.setDescription('participants of the bot'),
	async execute(interaction) {
		await interaction.reply('will reply with current participants');
	},
};