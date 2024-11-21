const Sequelize = require('sequelize');
// import { Sequelize } from "sequelize";
const cryptojs = require('crypto-js');
let { aes_key } = require('../config.json');
aes_key = cryptojs.enc.Utf8.parse(aes_key);

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
		type: Sequelize.STRING,
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
	},
	tuesday: {
		type: Sequelize.STRING,
	},
	wednesday: {
		type: Sequelize.STRING,
	},
	thursday: {
		type: Sequelize.STRING,
	},
	friday: {
		type: Sequelize.STRING,
	},
	saturday: {
		type: Sequelize.STRING,
	},
	sunday: {
		type: Sequelize.STRING,
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
            zipcode: cryptojs.AES.encrypt('00000', aes_key, { iv: cryptojs.enc.Base64.parse(tagName)}).toString(), // { iv: cryptojs.enc.Base64.parse(tagName)}
			choice1: null,
			choice2: null,
			choice3: null,
			choice4: null,
			choice5: null,
			monday: cryptojs.AES.encrypt("Unavailable", aes_key, { iv: cryptojs.enc.Base64.parse(`${tagName}monday`), }).toString(),
			tuesday: cryptojs.AES.encrypt("Unavailable", aes_key, { iv: cryptojs.enc.Base64.parse(`${tagName}tuesday`), }).toString(),
			wednesday: cryptojs.AES.encrypt("Unavailable", aes_key, { iv: cryptojs.enc.Base64.parse(`${tagName}wednesday`), }).toString(),
			thursday: cryptojs.AES.encrypt("Unavailable", aes_key, { iv: cryptojs.enc.Base64.parse(`${tagName}thursday`), }).toString(),
			friday: cryptojs.AES.encrypt("Unavailable", aes_key, { iv: cryptojs.enc.Base64.parse(`${tagName}friday`), }).toString(),
			saturday: cryptojs.AES.encrypt("Unavailable", aes_key, { iv: cryptojs.enc.Base64.parse(`${tagName}saturday`), }).toString(),
			sunday: cryptojs.AES.encrypt("Unavailable", aes_key, { iv: cryptojs.enc.Base64.parse(`${tagName}sunday`), }).toString(),

        });
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
	const user = await Tags.findOne({ where: { name: interaction.user.username, guildId: interaction.guildId } });
	// console.log(user.zipcode);
	if (user) {         //{ iv: cryptojs.enc.Base64.parse(user.name)}
		user.zipcode = cryptojs.AES.decrypt(user.zipcode, aes_key, { iv: cryptojs.enc.Base64.parse(user.name) }).toString(cryptojs.enc.Utf8);
		for (day of weekday)
			user[day] = cryptojs.AES.decrypt(user[day], aes_key, { iv: cryptojs.enc.Base64.parse(`${user.name}${day}`), } ).toString(cryptojs.enc.Utf8);
	}
	// console.log(user.zipcode);
	return user;
	
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
	else {
		// console.log(addition.toString());
		var ciphertext = cryptojs.AES.encrypt(`${addition}`, aes_key, { iv: cryptojs.enc.Base64.parse(tagName) });
		// console.log(ciphertext.toString());
		// console.log(ciphertext.ciphertext.toString())
		// var plaintext = cryptojs.AES.decrypt(ciphertext, aes_key, { iv: tagName});
		// console.log(plaintext.toString(cryptojs.enc.Utf8));
		affectedRows = await Tags.update({zipcode: ciphertext.toString()}, {where: { name : tagName }});
	}

	if (affectedRows > 0) {
		return await interaction.editReply({content: `Information for ${tagName} was updated.`, ephemeral: true});
	}

	return await interaction.editReply({content: `Please join first.`, ephemeral: true});
};

const getAvailable = async (interaction) => {
	// equivalent to: SELECT name FROM tags;
	// await interaction.deferReply({ephemeral: true});
	
	// const names = await Tags.findAll({ where: { available: true}});
	// names = names.map(t => t.name).join('\n'); //|| 'No tags set.';
	const people = await Tags.findAll({ where: { available: true, guildId: interaction.guildId}});
	// for (let user of people) {
	// 	user.zipcode = cryptojs.AES.decrypt(user.zipcode, aes_key, { iv: cryptojs.enc.Base64.parse(user.name) }).toString(cryptojs.enc.Utf8);
	// 	for (day of weekday)
	// 		user[day] = cryptojs.AES.decrypt(user[day], aes_key, { iv: cryptojs.enc.Base64.parse(`${user.name}${day}`), } ).toString(cryptojs.enc.Utf8);
	// }

	return people;
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
		const hours = cryptojs.AES.decrypt(person[today], aes_key, {iv : cryptojs.enc.Base64.parse(`${person.name}${today}`), }).toString(cryptojs.enc.Utf8);
		// console.log(hours);
		if (hours.includes(date.getHours()))
			person.available = true;
		else 
			person.available = false;
		await person.save({fields: ['available']});  //{available: person.available});
		// await Tags.update({available: true}, { where: {name : person.name}});
	}
	// await Tags.update({})
};

const makeDummies = async() => {
	for (let i = 0; i < 6; i++) {
		try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			let tagName = `testuser${i}`;
			const tag = await Tags.create({
				name: tagName,
				guildId: "1292674847813537812",
				zipcode: cryptojs.AES.encrypt('00000', aes_key, { iv: cryptojs.enc.Base64.parse(tagName)}).toString(), // { iv: cryptojs.enc.Base64.parse(tagName)}
				choice1: null,
				choice2: null,
				choice3: null,
				choice4: null,
				choice5: null,
				monday: cryptojs.AES.encrypt("Unavailable", aes_key, { iv: cryptojs.enc.Base64.parse(`${tagName}monday`), }).toString(),
				tuesday: cryptojs.AES.encrypt("Unavailable", aes_key, { iv: cryptojs.enc.Base64.parse(`${tagName}tuesday`), }).toString(),
				wednesday: cryptojs.AES.encrypt("Unavailable", aes_key, { iv: cryptojs.enc.Base64.parse(`${tagName}wednesday`), }).toString(),
				thursday: cryptojs.AES.encrypt("12", aes_key, { iv: cryptojs.enc.Base64.parse(`${tagName}thursday`), }).toString(),
				friday: cryptojs.AES.encrypt("Unavailable", aes_key, { iv: cryptojs.enc.Base64.parse(`${tagName}friday`), }).toString(),
				saturday: cryptojs.AES.encrypt("Unavailable", aes_key, { iv: cryptojs.enc.Base64.parse(`${tagName}saturday`), }).toString(),
				sunday: cryptojs.AES.encrypt("Unavailable", aes_key, { iv: cryptojs.enc.Base64.parse(`${tagName}sunday`), }).toString(),
	
			});
			// return await interaction.editReply({content: ` ${tag.name} joined.`, ephemeral: true, });
		}
		catch (error) {
			// console.log(error);
			if (error.name === 'SequelizeUniqueConstraintError') {
				// return await interaction.editReply({content: 'Already joined.', ephemeral: true});
			}
			
			// return await interaction.editReply({content: 'Something went wrong with joining.', ephemeral: true, });
		}
	}
}

module.exports = {
	Tags,
	addTag,
	getUser,
	editTag,
	getAvailable,
	deleteTag,
	updateAvailability,
	makeDummies
};