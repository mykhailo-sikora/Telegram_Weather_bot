module.exports = {
    isValidCity: (ctx, first_name, data, text) => {
        if (text === '/write' || text === '/save' || text === '/help') return ctx.reply(`${first_name}, sorry, incorrect input ${text}`);
        if (!data?.location?.name) return ctx.reply(`${first_name}, sorry, but this city not found ❌☹❌`);
    }
}
