const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

const options = [
    new StringSelectMenuOptionBuilder()
        .setLabel('Unavailable')
        .setValue("u"),
    new StringSelectMenuOptionBuilder()
        .setLabel('9 AM')
        .setValue('9'),
    new StringSelectMenuOptionBuilder()
        .setLabel('10 AM')
        .setValue('10'),
    new StringSelectMenuOptionBuilder()
        .setLabel('11 AM')
        .setValue('11'),
    new StringSelectMenuOptionBuilder()
        .setLabel('12 PM')
        .setValue('12'),
    new StringSelectMenuOptionBuilder()
        .setLabel('1 PM')
        .setValue('13'),
    new StringSelectMenuOptionBuilder()
        .setLabel('2 PM')
        .setValue('14'),
    new StringSelectMenuOptionBuilder()
        .setLabel('3 PM')
        .setValue('15'),
    new StringSelectMenuOptionBuilder()
        .setLabel('4 PM')
        .setValue('16'),
    new StringSelectMenuOptionBuilder()
        .setLabel('5 PM')
        .setValue('17'),
    new StringSelectMenuOptionBuilder()
        .setLabel('6 PM')
        .setValue('18'),
    new StringSelectMenuOptionBuilder()
        .setLabel('7 PM')
        .setValue('19'),
    new StringSelectMenuOptionBuilder()
        .setLabel('8 PM')
        .setValue('20'),
    new StringSelectMenuOptionBuilder()
        .setLabel('9 PM')
        .setValue('21'),
    new StringSelectMenuOptionBuilder()
        .setLabel('10 PM')
        .setValue('22'),
    new StringSelectMenuOptionBuilder()
        .setLabel('11 PM')
        .setValue('23'),
    new StringSelectMenuOptionBuilder()
        .setLabel('12 AM')
        .setValue('0'),
];


const monday = new StringSelectMenuBuilder()
    .setCustomId('monday')
    .setPlaceholder('Monday Availability')
    .addOptions(
        options
    )
    .setMaxValues(16);

const tuesday = new StringSelectMenuBuilder()
    .setCustomId('tuesday')
    .setPlaceholder('Tuesday Availability')
    .addOptions(
        options
    )
    .setMaxValues(16);

    //.setMinValues(2);

const wednesday = new StringSelectMenuBuilder()
    .setCustomId('wednesday')
    .setPlaceholder('Wednesday Availability')
    .addOptions(
        options
    )
    .setMaxValues(16);

    //.setMinValues(2);

const thursday = new StringSelectMenuBuilder()
    .setCustomId('thursday')
    .setPlaceholder('Thursday Availability')
    .addOptions(
        options
    )
    .setMaxValues(16);
    //.setMinValues(2);

const friday = new StringSelectMenuBuilder()
    .setCustomId('friday')
    .setPlaceholder('Friday Availability')
    .addOptions(
        options
    )
    .setMaxValues(16);
    //.setMinValues(2);

const saturday = new StringSelectMenuBuilder()
    .setCustomId('saturday')
    .setPlaceholder('Saturday Availability')
    .addOptions(
        options
    )
    .setMaxValues(16);

    //.setMinValues(2);

const sunday = new StringSelectMenuBuilder()
    .setCustomId('sunday')
    .setPlaceholder('Sunday Availability')
    .addOptions(
        options
    )
    .setMaxValues(16);

    //.setMinValues(2);

    
const weekdays = [
    new ActionRowBuilder().addComponents(monday),
    new ActionRowBuilder().addComponents(tuesday),
    new ActionRowBuilder().addComponents(wednesday),
    new ActionRowBuilder().addComponents(thursday),
    new ActionRowBuilder().addComponents(friday),
];

const weekend = [
    new ActionRowBuilder().addComponents(saturday),
    new ActionRowBuilder().addComponents(sunday),
];


// const zip = new ActionRowBuilder();

// const zipcollector = new TextInputBuilder()
//     .setCustomId('zip')
//     .setLabel('Enter zip code')
//     .setStyle(TextInputStyle.Short);

// zip.addComponents(zipcollector);

module.exports = {
    weekdays,
    weekend
    // zip: zip
};