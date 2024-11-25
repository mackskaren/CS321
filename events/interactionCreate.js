const { Events } = require('discord.js');
const {buttonpress} = require('./buttons.js');
const {getHobbies} = require('./hobbies.js');
const {modalresponse} = require('./modal.js');
const {updateSchedule} = require('./schedule.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);
	
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}
	
			try {
				await command.execute(interaction);
				//essage.author.send("hello");
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
				} else {
					await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				}
			}
		}
		else if (interaction.isButton()) {
			buttonpress(interaction);
		}
		else if (interaction.isStringSelectMenu()) {
			if (interaction.customId === 'hobbies')
				getHobbies(interaction);
			else
				updateSchedule(interaction);
		}
		else if (interaction.isModalSubmit()) {
			modalresponse(interaction);
		}
	}
};
// client.on(Events.InteractionCreate, async interaction => {
// 	if (interaction.isChatInputCommand()) {
// 		const command = interaction.client.commands.get(interaction.commandName);

// 		if (!command) {
// 			console.error(`No command matching ${interaction.commandName} was found.`);
// 			return;
// 		}

// 		try {
// 			await command.execute(interaction);
// 			//essage.author.send("hello");
// 		} catch (error) {
// 			console.error(error);
// 			if (interaction.replied || interaction.deferred) {
// 				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
// 			} else {
// 				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 			}
// 		}
// 	}
// 	else if (interaction.isButton()) {
// 		buttonpress(interaction);
// 	}
// 	else if (interaction.isStringSelectMenu()) {
// 		selectresponse(interaction);
// 	}
// 	else if (interaction.isModalSubmit()) {
// 		modalresponse(interaction);
// 	}
// });