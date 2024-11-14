const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const {buttons} = require('../../components/button.js');
const {choices} = require('../../components/selectmenu.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Message users in a server'),
		// .setDefaultMemberPermissions(0),
	async execute(interaction) {
		//await interaction.guild.members.cache.forEach(user => user.send("testing DM\'ing users").catch(e => console.log(e)));
		const owner = await interaction.guild.fetchOwner();
		console.log('server owner:   ', owner.user.username);
		console.log('command caller: ', interaction.user.username);
		// if (owner.user.username === interaction.user.username) {
			await interaction.guild.members.fetch()
			.then(fetchedMembers => {
				fetchedMembers.forEach(member => {
					if (!member.user.bot) {
						// member.user.send('testing DM\'ing users!');
						console.log("===>>>", member.user.username);
					}
				})
			});
			await interaction.reply({content: "testing buttons", components: [buttons, choices],});
			// await interaction.followUp({content: "testing buttons", components: choices,});
		// }
		// else {
			// await interaction.reply('you are not the server owner');
		// }
		// members.cache.forEach(member => console.log("===>>>", member.user.username));
		// .catch(console.error);//user => user.send("testing DM\'ing users").catch(e => console.log(e)));
		//await interaction.guild.members.cache.forEach(m => m.user.send('testing DM\'ing users!'))
		//await interaction.reply('testing DM\'ing users!');
	},
};