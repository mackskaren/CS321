const {ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');


const modal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle('My Modal');

const zipInput = new TextInputBuilder()
    .setCustomId('zipcode')
    .setLabel("What is your 5 digit ZIP code?")
    .setStyle(TextInputStyle.Short)
    .setMaxLength(5)
    .setMinLength(5)
    .setPlaceholder("Enter ZIP here:");

// An action row only holds one text input,
// so you need one action row per text input.
// const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
const secondActionRow = new ActionRowBuilder().addComponents(zipInput);

// Add inputs to the modal
modal.addComponents(secondActionRow);

// Show the modal to the user
// await interaction.showModal(modal);



module.exports = {
    modal: modal
}