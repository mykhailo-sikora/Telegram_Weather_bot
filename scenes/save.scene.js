const Scene = require('telegraf/scenes/base');

const {userService, userServiceConnect} = require('../service')
const {middleware} = require('../middleware');
const save = new Scene('save');

save.enter(async ctx => {
    try {
        await ctx.reply(`So, u want save city, it's great news ☺️. 
Please, send me name of your city. 
Thank you 🥰`);
    } catch (e) {
        console.log(e)
    }
});

save.on('message', async (ctx, next) => {
    try {
        const {id, first_name} = ctx.from;
        let {text} = ctx.message;

        const data = await userServiceConnect.connecting(text);
        const infoAboutWeather = data.data;
        if (middleware.isValidCity(ctx, first_name, infoAboutWeather, text)) {
            await ctx.reply(`Are you sure? Exactly? 🤨 I don't think so 🤭`)
            return ctx.scene.leave();
        }

        const user = await userService.getOne(id);

        if (!user) return await userService.create(id, first_name, text);

        await userService.update({city: text}, id);
        await ctx.reply(`${first_name}, I'll send you the weather at 10:10 in the morning 🥳 `)
        return ctx.scene.leave();
    } catch (e) {
        console.log(e)
    }
});

save.leave(async ctx => {
    try {
        await ctx.reply(`Hint here: 👉 /help`)
    } catch (e) {
        console.log(e)
    }

});

module.exports = save;
