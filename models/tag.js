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
//     addition: Sequelize.ARRAY(Sequelize.TEXT),
// 	availability: Sequelize.TEXT,
// });
const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	// description: Sequelize.TEXT,
	// username: Sequelize.STRING,
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
});



const addTag = async (interaction) => {
	const tagName = interaction.user.username;
    // const tagDescription = interaction.options.getString('description');
	await interaction.deferReply({ephemeral: true});
    try {
		// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
        const tag = await Tags.create({
			name: tagName,
            zipcode: 0,
			choice1: null,
			choice2: null,
			choice3: null,
			choice4: null,
			choice5: null,
        });
		
        return await interaction.editReply({content: `Tag ${tag.name} added.`, ephemeral: true});
    }
    catch (error) {
		console.log(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
			return await interaction.editReply({content: 'That tag already exists.', ephemeral: true});
        }
		
        return await interaction.editReply({content: 'Something went wrong with adding a tag.', ephemeral: true});
    }
};

const getTag = async (interaction) => {
	
	const tagName = interaction.options.getString('name');
	await interaction.deferReply({ephemeral: true});
	
	// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
	const tag = await Tags.findOne({ where: { name: tagName } });
	
	if (tag) {
		// equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
		tag.increment('usage_count');
		
		return await interaction.editReply(tag.get('description'));
	}
	
	return await interaction.editReply(`Could not find tag: ${tagName}`);
};

const editTag = async (interaction, addition) => {
	const tagName = interaction.user.username;
	await interaction.deferReply({ephemeral: true});
	let affectedRows = 0;
	
	if (isNaN(addition)) {
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
	return await interaction.editReply({content: `Tag ${tagName} was edited.`, ephemeral: true});
}

return await interaction.editReply({content: `Could not find a tag with name ${tagName}.`, ephemeral: true});
};

const tagInfo = async (interaction)  => {
	const tagName = interaction.options.getString('name');
	await interaction.deferReply({ephemeral: true});
	
	// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
	const tag = await Tags.findOne({ where: { name: tagName } });
	
	if (tag) {
		return await interaction.editReply(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);
	}
	
	return await interaction.editReply(`Could not find tag: ${tagName}`);
};

const showTags = async (interaction) => {
	// equivalent to: SELECT name FROM tags;
	await interaction.deferReply({ephemeral: true});
	
	const tagList = await Tags.findAll({ attributes: ['name'] });
	const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
	
	return await interaction.editReply(`List of tags: ${tagString}`);
};

const deleteTag = async (interaction) => {
	const tagName = interaction.user.username;
	await interaction.deferReply({ephemeral: true});
	
	// equivalent to: DELETE from tags WHERE name = ?;
	const rowCount = await Tags.destroy({ where: { name: tagName } });
	
	if (!rowCount) return await interaction.editReply({content: 'That tag doesn\'t exist.', ephemeral: true});
	
	return await interaction.editReply({content: 'Tag deleted.', ephemeral: true});
};


module.exports = {
	Tags,
	addTag,
	getTag,
	editTag,
	tagInfo,
	showTags,
	deleteTag
};