const { getUser } = require("../models/tag.js");
const cryptojs = require('crypto-js');
let { aes_key } = require('../config.json');
aes_key = cryptojs.enc.Utf8.parse(aes_key);



// const updateSchedule = (async interaction => {

//     // console.log(interaction);
//     let availability = interaction.values;
//     // console.log(hobbies);
//     availability.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
//     const day = interaction.customId;
//     // const date = new Date();
//     await updateDays(interaction, day, availability.toString());
//     // await interaction.reply({content: `Day: ${day}\nAvailability: ${availability.toString()}`, ephemeral: true});
//     // console.log(hobbies);
// });

const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

const updateSchedule = async (interaction) => {
    const availability = interaction.values;
    // console.log(hobbies);
    availability.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
	// console.log(availability[-1]);
    const day = interaction.customId;
	const tagName = interaction.user.username;
    // const hours = availability.toString();
	let hours = (availability[availability.length - 1] !== 'u') ? availability.toString() : "Unavailable";
	
    await interaction.deferReply({ephemeral: true});
	
	const record = await getUser(interaction);
	if (!record)
		return await interaction.editReply({content: `Please join the bot services first.`, ephemeral: true});
	// console.log(record);
	// record.days[day] = hours;
	record[day] = cryptojs.AES.encrypt(hours, aes_key, {iv : cryptojs.enc.Base64.parse(`${record.name}${day}`),}).toString();
	console.log(record[day]);
	// await record.update({days: record.days});
	const date = new Date();
	let today = weekday[date.getDay()];
	// console.log(hours);
	// hours = cryptojs.AES.decrypt(record[today], aes_key, {iv : cryptojs.enc.Base64.parse(`${record.name}${today}`),}).toString(cryptojs.enc.Utf8);
	today = (today === day) ? hours : record[today];
	console.log(today);
	if (today.includes(date.getHours()))
		record.available = true;
	else 
		record.available = false;
	await record.save({fields: [day, 'available']});
	// await Tags.update({available: record.available, days : record.days}, { where: {name : tagName}});

	return await interaction.editReply({content: `Schedule for ${tagName} was updated.`, ephemeral: true});

};


module.exports = {
    updateSchedule,
};