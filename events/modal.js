const { editTag } = require('../models/tag.js');

const modalresponse = async (interaction) => {
    const zip = parseInt(interaction.fields.getTextInputValue('zipcode'));
    if (!isNaN(zip))
        await editTag(interaction, interaction.fields.getTextInputValue('zipcode'));
        // await interaction.reply({content: `zip received: ${zip}`, ephemeral: true});
    else 
        await interaction.reply({content: `invalid zip`, ephemeral: true});
}


module.exports = {
    modalresponse,
};