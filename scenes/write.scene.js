const Scene = require('telegraf/scenes/base');

const {userServiceConnect} = require('../service');
const {middleware} = require('../middleware');
const write = new Scene('write');

write.enter(async ctx => {
    const {first_name} = ctx.from;
    await ctx.reply(`Okay, ${first_name}, please write a city and wait for one second.
I'm like a flash 🦸 💨`);
});

write.on('message', async ctx => {
    try {
        const {first_name} = ctx.from;
        const {text} = ctx.message;

        const data = await userServiceConnect.connecting(text);
        const infoAboutWeather = data.data;

        if (middleware.isValidCity(ctx, first_name, infoAboutWeather, text)) return ctx.scene.leave();

        const {name, country, localtime} = infoAboutWeather.location;
        const {temperature, weather_descriptions} = infoAboutWeather.current;
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
    await ctx.reply(`Another city❓ - /write 😏
    
Hint here: 👉 /help`)

});

module.exports = write;
