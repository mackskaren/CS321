const { getUser, encrypt, } = require("../models/tag.js");

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
		return await interaction.editReply({content: `Please join DARB first.`, ephemeral: true});
	// console.log(record);
	// record.days[day] = hours;
	record[day] = encrypt(hours, `${record.name}${day}`);
	// console.log(record[day]);
	// await record.update({days: record.days});
	const date = new Date();
	let today = weekday[date.getDay()];
	// console.log(hours);
	today = (today === day) ? hours : record[today];
	// console.log(today);
	if (today.includes(date.getHours().toString()))
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