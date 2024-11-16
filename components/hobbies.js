const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

const options = [
        new StringSelectMenuOptionBuilder()
        .setLabel('Reading')
        .setValue('Reading')
        .setEmoji("📚"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Watching TV shows and movies')
        .setValue('Watching_TV_Shows_and_Movies')
        .setEmoji("📺"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Gaming')
        .setValue('Gaming')
        .setEmoji("🎮"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Music (listening, playing instruments, singing)')
        .setValue('Music')
        .setEmoji("🎵"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Exercising')
        .setValue('Exercising')
        .setEmoji("🏋️"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Photography and videography')
        .setValue('Photography_and_Videography')
        .setEmoji("📷"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Playing sports (e.g., soccer, basketball, or e-sports)')
        .setValue('Playing_Sports')
        .setEmoji("⚽"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Cooking or baking')
        .setValue('Cooking_or_Baking')
        .setEmoji("🍳"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Creative writing')
        .setValue('Creative_Writing')
        .setEmoji("✍️"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Coding and software development')
        .setValue('Coding')
        .setEmoji("💻"),
    new StringSelectMenuOptionBuilder()
        .setLabel('DIY crafts and art projects')
        .setValue('DIY_Crafts')
        .setEmoji("🎨"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Skateboarding')
        .setValue('Skateboarding')
        .setEmoji("🛹"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Rollerblading')
        .setValue('Rollerblading')
        .setEmoji("🛼"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Fashion and styling')
        .setValue('Fashion_and_Styling')
        .setEmoji("👗"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Dancing')
        .setValue('Dancing')
        .setEmoji("💃"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Singing')
        .setValue('Singing')
        .setEmoji("🎤"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Camping')
        .setValue('Camping')
        .setEmoji("🏕️"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Hiking and nature exploration')
        .setValue('Hiking_and_Nature_Exploration')
        .setEmoji("🥾"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Gardening or plant care')
        .setValue('Gardening')
        .setEmoji("🌱"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Collecting (trading cards, sneakers, etc.)')
        .setValue('Collecting')
        .setEmoji("🃏"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Anime and manga fandom')
        .setValue('Anime_and_Manga')
        .setEmoji("📖"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Board games or tabletop games')
        .setValue('Board_Games')
        .setEmoji("🎲"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Volunteering and social activism')
        .setValue('Volunteering')
        .setEmoji("🤝"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Graphic design or digital art')
        .setValue('Graphic_Design')
        .setEmoji("🖌️"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Meditation and mindfulness practices')
        .setValue('Meditation')
        .setEmoji("🧘"),
];


const choice1 = new StringSelectMenuBuilder()
    .setCustomId('hobbies')
    .setPlaceholder('Select Hobbies')
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