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

const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

const formatInfo = (user) => {
	let info = `Information for ${user.name}:\n- Available at the moment: ${(user.available) ? 'Yes': 'No'}\n- Activities selected:\n`;
	for (let i = 1; i < 6; i++) {
		if (user[`choice${i}`])
			info += `  - ${user[`choice${i}`]}\n`;
	}
	info += '- Availability:\n';
	for (var day of weekday) {
		// console.log(`${day}`);
		let schedule = user[`${day}`];
		// console.log(schedule);
		schedule = schedule.split(',');
		info += formatSchedule(day, schedule);
	}
	return info;
};

const formatSchedule = (day, schedule) => {
	if (schedule[0] === 'Unavailable')
		return `  - ${day}: Unavailable\n`;
	let info = `  - ${day}: `;
	let start = false;
	let i = 0;
	while (i < schedule.length) {
		if (!start) {
			info += ` ${(schedule[i] % 12) ? schedule[i] % 12 : '12'} `;
			info += `${(Math.floor(schedule[i] / 12)) ? 'PM' : 'AM'}`;
			start = true;
		} else {
			if (schedule[i] - schedule[i - 1] == 1) {
				info += ' -';
			}
			else {
				if (info[info.length - 1] !== '-') {
					info += ',';
				}
				else {
					info += ` ${(schedule[i - 1] % 12) ? schedule[i - 1] % 12 : '12'} `;
					info += `${(Math.floor(schedule[i - 1] / 12)) ? 'PM' : 'AM'}, `;
				}
				start = false;
				continue;
			}
		}
		i += 1;
	}
	if (info[info.length - 1] === '-') {
		info += ` ${(schedule[schedule.length - 1] % 12) ? schedule[schedule.length - 1] % 12 : '12'} `;
		info += `${(Math.floor(schedule[schedule.length - 1] / 12)) ? 'PM' : 'AM'}`;
	}
	info += '\n';
	return info;
}