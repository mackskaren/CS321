// require('dotenv').config();

const {token} = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, } = require('discord.js');
const { updateAvailability } = require("./models/tag.js");

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers] 
});


client.on('ready', () => {
	console.log('bot is ready');
});


client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
};

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
};

const date = new Date();
// console.log(date);
let time = 60000 * (60 - date.getMinutes());
time -= 1000 * (59 - date.getSeconds());
time -= 1000 - date.getMilliseconds();
console.log(time);
setTimeout(updateAvailability, time, 1);
// timersPromises.setInterval();
// setInterval(updateAvailability, 3600000);

client.login(token);