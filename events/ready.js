const {Events} = require('discord.js');
const {updateAvailability, makeDummies, sync} = require('../models/tag.js');


module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute (client) {
        await sync;
        console.log(`Logged in as ${client.user.tag}!`);
        makeDummies();
        updateAvailability(0);
        const date = new Date();
        let time = 60000 * (60 - date.getMinutes()) + 1000;
        time -= 1000 * date.getSeconds();
        // time -= date.getMilliseconds();
        // console.log(time);
        setTimeout(updateAvailability, time, 1);
    }
};
// client.once(Events.ClientReady, readyClient => {
// 	const database = require('./models/tag.js');
// 	database.Tags.sync();
// 	console.log(`Logged in as ${readyClient.user.tag}!`);
// });