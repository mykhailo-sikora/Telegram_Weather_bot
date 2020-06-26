const Scene = require('telegraf/scenes/base');

const {userService} = require('../service')

const unsubscribe = new Scene('unsubscribe');

unsubscribe.enter(async ctx => {
    const {id} = ctx.from;

    await ctx.reply('Wait, I`ll unsubscribe...')
    await userService.update({city: null}, id);

    return ctx.scene.leave();
});

unsubscribe.leave(async ctx => {
    await ctx.reply(`Done, bye-bye 💔
    
Hint here: 👉 /help`)
});

module.exports = unsubscribe;
