const Scene = require('telegraf/scenes/base');

const axios = require('axios');
const {config: {API, KEY}} = require('../configs');

const write = new Scene('write');

write.enter(async ctx => {
    const {first_name} = ctx.from;
    await ctx.reply(`Okay, ${first_name}, please write a city and wait for one second.
I'm like a flesh 🦸`);
});

write.on('message', async ctx => {
    try {
        const {first_name} = ctx.from;
        const {text} = ctx.message;

        const data = await axios.get(`${API}` + `${KEY}` + `${text}`);
        const infoAboutWeather = data.data;

        if (!infoAboutWeather?.location?.name) return ctx.reply(`${first_name}, sorry, but this city not found ❌☹❌`);

        const {name, country, localtime} = infoAboutWeather.location;
        const {temperature, weather_descriptions, weather_icons} = infoAboutWeather.current;
        await ctx.replyWithMarkdown(
            ` *${first_name}*, weather in *${name}*, *${country}* at *${localtime}* 👍 
Temperature: *${temperature}* 🌡️
Description: *${weather_descriptions}*  📄
       `)
        return ctx.scene.leave();
    } catch (e) {
        console.log(e)
    }
});

write.leave(async ctx => {
    const {first_name} = ctx.from;
    await ctx.reply(`${first_name}, see u later, bye`)
});

module.exports = write;
