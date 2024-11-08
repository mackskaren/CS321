const Sequelize = require('sequelize');
// import { Sequelize } from "sequelize";

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

// export const Tags = sequelize.define('tags', {
// 	name: {
// 		type: Sequelize.STRING,
// 		unique: true,
// 	},
//     hobbies: Sequelize.ARRAY(Sequelize.TEXT),
// 	availability: Sequelize.TEXT,
// });
module.exports.Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	//zipcode: Sequelize.INTEGER,
	//choice1: Sequelize.String,
	//choice2: Sequelize.String,
	//choice3: Sequelize.String,
	//choice4: Sequelize.String,
	//choice5: Sequelize.String
	//
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});



module.exports.addTag = async function addTag(interaction){
    const tagName = interaction.options.getString('name');
    const tagDescription = interaction.options.getString('description');

    try {
        // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
        const tag = await Tags.create({
            name: tagName,
            description: tagDescription,
            username: interaction.user.username,
        });

        return interaction.reply(`Tag ${tag.name} added.`);
    }
    catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return interaction.reply('That tag already exists.');
        }

        return interaction.reply('Something went wrong with adding a tag.');
    }
};

module.exports.getTag = async function getTag(interaction) {

    const tagName = interaction.options.getString('name');

	// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
	const tag = await Tags.findOne({ where: { name: tagName } });

	if (tag) {
		// equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
		tag.increment('usage_count');

		return interaction.reply(tag.get('description'));
	}

	return interaction.reply(`Could not find tag: ${tagName}`);
};

module.exports.editTag = async function editTag(interaction) {
    const tagName = interaction.options.getString('name');
	const tagDescription = interaction.options.getString('description');

	// equivalent to: UPDATE tags (description) values (?) WHERE name='?';
	const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });

	if (affectedRows > 0) {
		return interaction.reply(`Tag ${tagName} was edited.`);
	}

	return interaction.reply(`Could not find a tag with name ${tagName}.`);
};

module.exports.tagInfo = async function tagInfo(interaction) {
    const tagName = interaction.options.getString('name');

	// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
	const tag = await Tags.findOne({ where: { name: tagName } });

	if (tag) {
		return interaction.reply(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);
	}

	return interaction.reply(`Could not find tag: ${tagName}`);
};

module.exports.showTags = async function showTags(interaction) {
    // equivalent to: SELECT name FROM tags;
	const tagList = await Tags.findAll({ attributes: ['name'] });
	const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';

	return interaction.reply(`List of tags: ${tagString}`);
};

module.exports.deleteTag = async function deleteTag(interaction) {
    const tagName = interaction.options.getString('name');
	// equivalent to: DELETE from tags WHERE name = ?;
	const rowCount = await Tags.destroy({ where: { name: tagName } });

	if (!rowCount) return interaction.reply('That tag doesn\'t exist.');

	return interaction.reply('Tag deleted.');
}