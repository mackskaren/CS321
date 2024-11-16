const {addTag, deleteTag} = require("../models/tag.js");
const {modal} = require("../components/getzip.js");

const buttonpress = (async interaction => {
    if (interaction.customId === "add to database") {
    	// const message = await interaction.reply({content: "testing reaction", fetchReply: true});
        const message = await addTag(interaction);
        // message.react("🤝");
        // await interaction.reply({content: 'joined', ephemeral: true});
        // await interaction.reply({content: "Give your top 5 hobbies", components: select.choices});
    }
    else if (interaction.customId === "leave database") {
        // await interaction.deleteReply();
        // await interaction.reply({content: "removed", ephemeral: true});
        await deleteTag(interaction);
    }
    else if (interaction.customId === 'zip code') {
        await interaction.showModal(modal);
    }
});


module.exports = {
    buttonpress,
    
};