const buttonpress = (async interaction => {
    if (interaction.customId === "add to database") {
        await interaction.reply({content: 'joined', ephemeral: true});
        // await interaction.reply({content: "Give your top 5 hobbies", components: select.choices});
    }
    else if (interaction.customId === "leave database") {
        // await interaction.deleteReply();
        await interaction.reply({content: "removed", ephemeral: true});
    }
});


module.exports = {
    buttonpress: buttonpress,
    
}