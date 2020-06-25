const CronJob = require('cron').CronJob;

const Telegraf = require('telegraf');
const axios = require('axios');

const {config: {API, KEY, TOKEN}} = require('../configs')
const {userService} = require('../service');

const bot = new Telegraf(TOKEN);

module.exports = () => {
    const job = new CronJob('* 05 10 * * *', async () => {
        try {
            const users = await userService.getAll();
            for (const user of users) {
                const {name: userName, telegramId, city} = user;

                const data = await axios.get(`${API}` + `${KEY}` + `${city}`);
                const infoAboutWeather = data.data;

                const {name, country, localtime} = infoAboutWeather.location;
                const {temperature, weather_descriptions} = infoAboutWeather.current;

                await bot.telegram.sendMessage(`${telegramId}`, `📢 Hey, it's daily weather ${userName}, in ${name}, ${country} at ${localtime}. 
Temperature: ${temperature} 🌡️
Description: ${weather_descriptions}
       `);
            }
        } catch (e) {
            console.log(e)
        }
    });
    return job.start();
};

