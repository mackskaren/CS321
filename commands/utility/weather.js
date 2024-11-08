const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Get the weather for a specific city')
        .addStringOption(option =>
            option.setName('city')
                .setDescription('The name of the city to get weather for')
                .setRequired(true)),
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const cityName = interaction.options.getString('city');
        const apiKey = 'a47fc356c2aab7376fcf8207745cfe92'; 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(url);
            const weatherData = response.data;
            const weatherDescription = weatherData.weather[0].description;
            const temperature = weatherData.main.temp;

            await interaction.reply(`The weather in ${cityName} is currently ${weatherDescription} with a temperature of ${temperature}°C.`);
        } catch (error) {
            console.error(error);
            await interaction.reply('Sorry, I could not fetch the weather. Please make sure the city name is correct.');
        }
    }
};
