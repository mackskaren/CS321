const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

const options = [
        new StringSelectMenuOptionBuilder()
        .setLabel('Reading')
        .setValue('Reading')
        .setEmoji("📚"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Shopping')
        .setValue('Shopiing')
        .setEmoji("🛍️"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Watching TV shows and Movies')
        .setValue('Watching TV Shows and Movies')
        .setEmoji("📺"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Music (listening, playing instruments, singing)')
        .setValue('Music')
        .setEmoji("🎵"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Exercising')
        .setValue('Exercising')
        .setEmoji("🏋️"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Dining')
        .setValue('Dining')
        .setEmoji("🍽️"),    
    new StringSelectMenuOptionBuilder()
        .setLabel('Photography and videography')
        .setValue('Photography and Videography')
        .setEmoji("📷"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Playing sports (e.g., soccer, basketball, or e-sports)')
        .setValue('Playing Sports')
        .setEmoji("⚽"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Cooking or baking')
        .setValue('Cooking or Baking')
        .setEmoji("🍳"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Creative writing')
        .setValue('Creative Writing')
        .setEmoji("✍️"),
    new StringSelectMenuOptionBuilder()
        .setLabel('DIY crafts and art projects')
        .setValue('DIY Crafts')
        .setEmoji("🎨"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Fashion and styling')
        .setValue('Fashion and Styling')
        .setEmoji("👗"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Camping')
        .setValue('Camping')
        .setEmoji("🏕️"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Hiking and nature exploration')
        .setValue('Hiking and Nature Exploration')
        .setEmoji("🥾"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Gardening or plant care')
        .setValue('Gardening')
        .setEmoji("🌱"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Board games or tabletop games')
        .setValue('Board Games')
        .setEmoji("🎲"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Casino')
        .setValue('Casino')
        .setEmoji("🎲"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Volunteering')
        .setValue('Volunteering')
        .setEmoji("❤️"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Ice Skating')
        .setValue('Ice Skating')
        .setEmoji("⛸️"),
    new StringSelectMenuOptionBuilder()
        .setLabel('NightLife')
        .setValue('NightLife')
        .setEmoji("🪩"),
];


const choice1 = new StringSelectMenuBuilder()
    .setCustomId('hobbies')
    .setPlaceholder('Things to do as a group')
    .addOptions(
        options
    )
    .setMinValues(0)
    .setMaxValues(5);

    
const choices = new ActionRowBuilder().addComponents(choice1);


// const zip = new ActionRowBuilder();

// const zipcollector = new TextInputBuilder()
//     .setCustomId('zip')
//     .setLabel('Enter zip code')
//     .setStyle(TextInputStyle.Short);

// zip.addComponents(zipcollector);

module.exports = {
    choices,
    // zip: zip
};