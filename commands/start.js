module.exports = () => async (ctx) => {
    const {first_name} = ctx.from;
    ctx.reply(`Hi, ${first_name} in Weather Peace Bot ☮️.
Use the /help command to find out what I can do.`)
}
