const {addTag, deleteTag} = require("../models/tag.js");
const {modal} = require("../components/modal.js");

const buttonpress = (async interaction => {
    if (interaction.customId === "add to database") {
        await addTag(interaction);
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
    buttonpress: buttonpress,
    
}