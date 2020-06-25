module.exports = () => async (ctx) => {
    const {first_name} = ctx.from;
    ctx.reply(`${first_name}, this bot use next commands: 
    
/start - Start bot;
/write - Write city and take information about weather;
/save  - Send the current weather in your city every morning;
/unsubscribe - Unsubscribe from daily weather information;

/help  - User help.
`)
}
