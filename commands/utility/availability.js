const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('availability')
		.setDescription('Gets Availability!'),
	async execute(interaction) {
		await interaction.reply('This command will reply with the availability of current users');
	},
};