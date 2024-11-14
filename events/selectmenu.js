const {editTag} = require("../models/tag.js");
// const { options } = require('../components/selectmenu.js')

const selectresponse = (async interaction => {

    // console.log(interaction);
    let hobbies = interaction.values;
    // console.log(hobbies);
    while (hobbies.length < 5) {
        hobbies.push(null);
    }
    // console.log(hobbies);
    await editTag(interaction, hobbies);
    // await interaction.reply({content: 'reply received. need to store', ephemeral: true});

    // const collector = interaction.createMessageComponentCollector({
    //     componentType: ComponentType.StringSelect,
    //     filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
    //     time: 60_000
    // });
    // collector.on('collect', (interaction) => {
    //     console.log(interaction.values);
    // });
});


// const selectresponse = (async interaction => {
//     const collector = interaction.createMessageComponentCollector({
//         componentType: ComponentType.StringSelect,
//         filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
//         time: 60_000
//     });
//     collector.on('collect', (interaction) => {
//         console.log(interaction.values);
//     });
// });


module.exports = {
    selectresponse: selectresponse,
    
};