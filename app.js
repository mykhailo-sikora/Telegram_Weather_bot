require('dotenv').config();
require('./dataBase').getInstance().setModels();

const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');

const {config: {TOKEN, PORT, URL}} = require('./configs');
const {cron} = require('./crons');
const {writeScene, saveScene, unsubscribedScene} = require('./scenes');
const {startCommand, helpCommand} = require('./commands');

const init = async (bot) => {
    const stage = new Stage([writeScene, saveScene, unsubscribedScene]);

    bot.use(session());
    bot.use(stage.middleware());
    bot.start(startCommand())
    bot.help(helpCommand())
    bot.command('write', ctx => (ctx.scene.enter('write')));
    bot.command('save', ctx => (ctx.scene.enter('save')));
    bot.command('unsubscribe', ctx => (ctx.scene.enter('unsubscribe')));
    bot.on('message', async ctx => {
        const {first_name} = ctx.from;
        ctx.reply(`It's cool, ${first_name}(!) but use please the commands! 
Maybe in the future, I will be smarter or not 😜

Hint here: 👉 /help`)
    });

    return bot;
};

init(new Telegraf(TOKEN)).then(async (bot) => {
    await bot.telegram.setWebhook(`${URL}/bot${TOKEN}`);
    await bot.startWebhook(`/bot${TOKEN}`, null, PORT);
    await bot.launch();
});

module.exports = init;

//process.on("unhandledRejection", () => process.exit(0));

cron();

