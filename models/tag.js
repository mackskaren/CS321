const Sequelize = require('sequelize');
// import { Sequelize } from "sequelize";

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Tags = sequelize.define('users', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	guildId: {
		type: Sequelize.STRING,
	},
	available: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	zipcode: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	choice1: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	choice2: {
		type: Sequelize.STRING,
		allowNull: true
	},
	choice3: {
		type: Sequelize.STRING,
		allowNull: true
	},
	choice4: {
		type: Sequelize.STRING,
		allowNull: true
	},
	choice5: {
		type: Sequelize.STRING,
		allowNull: true
	},
	monday: {
		type: Sequelize.STRING,
		defaultValue: "Unavailable"
	},
	tuesday: {
		type: Sequelize.STRING,
		defaultValue: "Unavailable"
	},
	wednesday: {
		type: Sequelize.STRING,
		defaultValue: "Unavailable"
	},
	thursday: {
		type: Sequelize.STRING,
		defaultValue: "Unavailable"
	},
	friday: {
		type: Sequelize.STRING,
		defaultValue: "Unavailable"
	},
	saturday: {
		type: Sequelize.STRING,
		defaultValue: "Unavailable"
	},
	sunday: {
		type: Sequelize.STRING,
		defaultValue: "Unavailable"
	}
	// days: {
	// 	type: Sequelize.JSON,
	// 	defaultValue: {
	// 		"monday": '',
	// 		"tuesday": '',
	// 		"wednesday": '',
	// 		"thursday": '',
	// 		"friday": '',
	// 		"saturday": '',
	// 		"sunday": ''
	// 	},
	// },
});


const addTag = async (interaction) => {
	const tagName = interaction.user.username;
    // const tagDescription = interaction.options.getString('description');
	await interaction.deferReply({ephemeral: true, });
    try {
		// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
        const tag = await Tags.create({
			name: tagName,
			guildId: interaction.guildId,
            zipcode: 0,
			choice1: null,
			choice2: null,
			choice3: null,
			choice4: null,
			choice5: null,
        });
		// const random = await Tags.create({
		// 	name: 'random',
        //     zipcode: 0,
		// 	choice1: null,
		// 	choice2: null,
		// 	choice3: null,
		// 	choice4: null,
		// 	choice5: null,
        // });
		// updateAvailability();
        return await interaction.editReply({content: ` ${tag.name} joined.`, ephemeral: true, });
    }
    catch (error) {
		console.log(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
			return await interaction.editReply({content: 'Already joined.', ephemeral: true});
        }
		
        return await interaction.editReply({content: 'Something went wrong with joining.', ephemeral: true, });
    }
};

const getUser = async (interaction) => {
	
	// const name = interaction.options.getString('name');
	// await interaction.deferReply({ephemeral: true});
	// const name = interaction.user.username;
	// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
	return await Tags.findOne({ where: { name: interaction.user.username, guildId: interaction.guildId } });
	
	// if (tag) {
	// 	// equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
	// 	tag.increment('usage_count');
		
	// 	return await interaction.editReply(tag.get('description'));
	// }
	
	// return await interaction.editReply(`Could not find tag: ${tagName}`);
};

const editTag = async (interaction, addition) => {
	const tagName = interaction.user.username;
	await interaction.deferReply({ephemeral: true});
	let affectedRows = 0;
	
	if (typeof addition === 'object') {
		affectedRows = await Tags.update({ choice1: addition[0],
			choice2: addition[1],
			choice3: addition[2],
			choice4: addition[3],
			choice5: addition[4],
		}, { where: { name: tagName } });
	}
	else
		affectedRows = await Tags.update({zipcode: addition}, {where: { name : tagName }});

	if (affectedRows > 0) {
		return await interaction.editReply({content: `Information for ${tagName} was updated.`, ephemeral: true});
	}

	return await interaction.editReply({content: `Please join first.`, ephemeral: true});
};

const tagInfo = async (interaction)  => {
	// const tagName = interaction.username;//options.getString('name');
	// await interaction.deferReply({ephemeral: true});
	
	// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
	// const tag = await Tags.findOne({ where: { name: tagName } });
	return await Tags.findOne({ where: { name: interaction.user.username, guildId: interaction.guildId } });
	// if (tag) {
	// 	return await interaction.editReply(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);
	// }
	
	// return await interaction.editReply(`Could not find tag: ${tagName}`);
};

const getAvailable = async (interaction) => {
	// equivalent to: SELECT name FROM tags;
	// await interaction.deferReply({ephemeral: true});
	
	// const names = await Tags.findAll({ where: { available: true}});
	// names = names.map(t => t.name).join('\n'); //|| 'No tags set.';
	return await Tags.findAll({ where: { available: true, guildId: interaction.guildId}});
	// return await interaction.editReply(`Available Users: ${tagString}`);
};


const deleteTag = async (interaction) => {
	const tagName = interaction.user.username;
	await interaction.deferReply({ephemeral: true});
	
	// equivalent to: DELETE from tags WHERE name = ?;
	const rowCount = await Tags.destroy({ where: { name: tagName } });
	
	if (!rowCount) return await interaction.editReply({content: 'No entry found.', ephemeral: true});
	
	return await interaction.editReply({content: 'Information deleted.', ephemeral: true});
};

const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

const updateAvailability = async (flag) => {
	if (flag) 
		setInterval(updateAvailability, 3600000, 0);
	const date = new Date();
	console.log(`updating availability at ${date.getHours()}:${date.getMinutes()}`);
	const today = weekday[date.getDay()];
	const people = await Tags.findAll();
	// console.log(people);
	// people.array.forEach(element => {
		
	// });
	for (let person of people) {
		// console.log(person.name, person.days[today]);
		if (person[today].includes(date.getHours()))
			person.available = true;
		else 
			person.available = false;
		await person.save();  //{available: person.available});
		// await Tags.update({available: true}, { where: {name : person.name}});
	}
	// await Tags.update({})
};

module.exports = {
	Tags,
	addTag,
	getUser,
	editTag,
	tagInfo,
	getAvailable,
	deleteTag,
	updateAvailability
};