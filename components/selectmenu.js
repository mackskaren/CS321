const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType } = require('discord.js');

const options = [
    new StringSelectMenuOptionBuilder()
        .setLabel('Bowling')
        .setValue('1')
        .setEmoji("🎳"),
    new StringSelectMenuOptionBuilder()
        .setLabel('Fishing')
        .setValue('2')
        .setEmoji('🎣'),
    new StringSelectMenuOptionBuilder()
        .setLabel('Hiking')
        .setValue('3')
        .setEmoji('⛰️'),
    new StringSelectMenuOptionBuilder()
        .setLabel('Running')
        .setValue('4')
        .setEmoji('🏃‍♀️'),
    new StringSelectMenuOptionBuilder()
        .setLabel('Swimming')
        .setValue('5')
        .setEmoji('🏊‍♂️'),
    
];


const choice1 = new StringSelectMenuBuilder()
    .setCustomId('Choice 1')
    .setPlaceholder('Select Hobbies')
    .addOptions(
        options
    )
    .setMinValues(0)
    .setMaxValues(5);

    
const choices = new ActionRowBuilder().addComponents(choice1);

module.exports = {
    choices: choices,
    
};