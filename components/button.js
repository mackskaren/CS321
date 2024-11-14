const { ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require('discord.js');
const select = require('./selectmenu.js')


const buttons = new ActionRowBuilder();
const button1 = new ButtonBuilder()
	.setCustomId("add to database")
    .setLabel("Join Bot Services")
    .setEmoji("🤝")
	.setStyle(ButtonStyle.Primary);
const button2 = new ButtonBuilder()
	.setCustomId("leave database")
    .setLabel('Leave Bot Services')
    .setEmoji('👋')
	.setStyle(ButtonStyle.Danger);
const button3 = new ButtonBuilder()
    .setCustomId("zip code")
    .setLabel('zip code')
    .setEmoji('🤐')
    .setStyle(ButtonStyle.Secondary);

buttons.addComponents(button1, button2, button3);

module.exports = {
    buttons: buttons,
    
}