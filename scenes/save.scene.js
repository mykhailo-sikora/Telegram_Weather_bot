const Scene = require('telegraf/scenes/base');
const axios = require('axios');

const {config: {API, KEY}} = require('../configs');
const {userService} = require('../service')

const save = new Scene('save');

save.enter(async ctx => {
    await ctx.reply(`So, u want save city, it's great news ☺️. 
Please, send me name of your city. 
Thank you 🥰`);
});

save.on('message', async ctx => {
    try {
        const {id, first_name} = ctx.from;
        let {text} = ctx.message;

        const data = await axios.get(`${API}` + `${KEY}` + `${text}`);
        const infoAboutWeather = data.data;

        if (!infoAboutWeather?.location?.name) return ctx.reply(`${first_name}, sorry, but this city not found ❌☹❌`);

        const user = await userService.getOne(id);

        if (!user) return await userService.create(id, first_name, text);

        await userService.update({city: text}, id);

        return ctx.scene.leave();
    } catch (e) {
        console.log(e)
    }
});

save.leave(async ctx => {
    await ctx.reply('Cool, I`m save your city 😎')
});

module.exports = save;
