const { SlashCommandBuilder } = require('discord.js');
// const {}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('location')
		.setDescription('current working location')
		.addIntegerOption(option => option.setName('zip').setDescription('zip code to set')),
	async execute(interaction) {
		const zip = await interaction.options.getInteger("zip");

		await interaction.reply({content: `zip code to test ${zip}`, ephemeral: true});
	},
};