const { SlashCommandBuilder } = require('discord.js');
const { tagInfo } = require("../../models/tag.js");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Display user\'s information'),
	async execute(interaction) {
		await interaction.deferReply({ephemeral: true});
		let user = await tagInfo(interaction);
		// console.log(names);
		// names = names.map(entry => entry.user).join('\n'); //|| 'No tags set.';
		if (user) {
            // let info = `Information for Information for ${user.username}:\n`;
			// info += `Available: ${(user.available) ? 'yes': 'no'}\n`
			// info += `Hobbies:\n${user.choice1}\n${user.choice2}\n${user.choice3}\n${user.choice4}\n${user.choice5}\n`;
			// info += `Schedule:\n`;
			await interaction.editReply(formatInfo(user));
        }
		else 
			await interaction.editReply('No user info available');
		// await interaction.reply('This command will reply with the availability of current users');
	},
};

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const formatInfo = (user) => {
	let info = `Information for Information for ${user.username}:\nAvailable: ${(user.available) ? 'yes': 'no'}\nHobbies:\n`;
	for (let i = 1; i < 6; i++) {
		if (user[`choice${i}`])
			info += user[`choice${i}`] + '\n';
	}
	for (var day of weekday) {
		let schedule = user[`${day}`];
		schedule = schedule.split(',');
		if (schedule[0] === 'Unavailable')
			info += `${day}: Unavailable\n`;
		else {
			info += formatSchedule(day, schedule);
		}
	}
	return info;
};

const formatSchedule = (day, schedule) => {
	let info = `${day}: `;
	for (var hour of schedule) {
		
	}
	return info;
}