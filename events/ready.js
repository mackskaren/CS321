const {Events} = require('discord.js');


module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
    const database = require('../models/tag.js');
	database.Tags.sync();
	console.log(`Logged in as ${client.user.tag}!`);
    }
}
// client.once(Events.ClientReady, readyClient => {
// 	const database = require('./models/tag.js');
// 	database.Tags.sync();
// 	console.log(`Logged in as ${readyClient.user.tag}!`);
// });