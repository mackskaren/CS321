const {editTag} = require("../models/tag.js");
// const { options } = require('../components/selectmenu.js')

const getHobbies = (async interaction => {

    // console.log(interaction);
    let hobbies = interaction.values;
    // console.log(hobbies);
    while (hobbies.length < 5) {
        hobbies.push(null);
    }
    // console.log(hobbies);
    await editTag(interaction, hobbies);
    // await interaction.reply({content: 'reply received. need to store', ephemeral: true});
});

module.exports = {
    getHobbies,
    
};