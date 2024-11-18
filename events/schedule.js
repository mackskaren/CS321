const {getUser} = require("../models/tag.js");

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
	const hours = (availability[availability.length - 1] !== 'u') ? availability.toString() : "Unavailable";
	
    await interaction.deferReply({ephemeral: true});
	
	const record = await getUser(interaction);
	if (!record)
		return await interaction.editReply({content: `Please join the bot services first.`, ephemeral: true});
	// console.log(record);
	// record.days[day] = hours;
	record[day] = hours;
	// console.log(record);
	// await record.update({days: record.days});
	const date = new Date();
	const today = weekday[date.getDay()];
	if (today === day && record[today].includes(date.getHours()))
		record.available = true;
	else 
		record.available = false;
	await record.save();
	// await Tags.update({available: record.available, days : record.days}, { where: {name : tagName}});

	return await interaction.editReply({content: `Schedule for ${tagName} was updated.`, ephemeral: true});

};


module.exports = {
    updateSchedule,
};