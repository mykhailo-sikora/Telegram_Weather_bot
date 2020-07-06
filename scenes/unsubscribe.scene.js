const Scene = require('telegraf/scenes/base');

const {userService} = require('../service')

const unsubscribe = new Scene('unsubscribe');

unsubscribe.enter(async ctx => {
    try {
        const {id} = ctx.from;

        await ctx.reply('Wait, I`ll unsubscribe...')
        await userService.update({city: null}, id);

        return ctx.scene.leave();
    } catch (e) {
        console.log(e)
    }

});

unsubscribe.leave(async ctx => {
    try {
        await ctx.reply(`Done, bye-bye 💔
    
Hint here: 👉 /help`)
    } catch (e) {
        console.log(e)
    }

});

module.exports = unsubscribe;
