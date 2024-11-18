const { SlashCommandBuilder } = require('discord.js');
const { getAvailable } = require("../../models/tag.js");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('available')
		.setDescription('Display available users'),
	async execute(interaction) {
		await interaction.deferReply({});
		let names = await getAvailable(interaction);
		console.log(names);
		names = names.map(entry => entry.name).join('\n'); //|| 'No tags set.';
		if (names)
			await interaction.editReply(`Available Users:\n${names}`);
		else 
			await interaction.editReply('No users free at this time');
		// await interaction.reply('This command will reply with the availability of current users');
	},
};