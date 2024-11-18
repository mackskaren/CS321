const { SlashCommandBuilder } = require('discord.js');
const { tagInfo } = require("../../models/tag.js");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Display user\'s information'),
	async execute(interaction) {
		await interaction.deferReply({});
		let name = await tagInfo(interaction);
		// console.log(names);
		// names = names.map(entry => entry.name).join('\n'); //|| 'No tags set.';
		if (name) {
            
			await interaction.editReply(`Available Users:\n${names}`);
        }
		else 
			await interaction.editReply('No info available or not part of bot services');
		// await interaction.reply('This command will reply with the availability of current users');
	},
};