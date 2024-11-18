const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
// const {buttons} = require('../../components/buttons.js');
// const {choices} = require('../../components/hobbies.js');
// const {weekdays, weekend} = require('../../components/schedule.js');
const { buttons, choices, weekdays, weekend } = require('../../components/components.js');


module.exports = {
	cooldown: 86400,
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
			await interaction.reply({content: "Welcome the Activity Scheduler!", components: [buttons, choices], });
			await interaction.followUp({content: "Weekday Availability", components: weekdays});
			await interaction.followUp({content: "Weekend Availability", components: weekend});
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