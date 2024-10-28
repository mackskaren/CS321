const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggestion')
		.setDescription('give idea on what to do'),
	async execute(interaction) {
		await interaction.reply('will reply with an idea for the group to do');
	},
};