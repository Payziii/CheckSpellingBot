const Data = require('./data.js');
const { setTimeout } = require("timers/promises");

module.exports = async function check(conversation, ctx) {

    await ctx.reply("Введите текст (от 100 до 1500 символов)")

    let text = await conversation.wait();
    text = text.message.text;

    const body = {
        "userkey": process.env.TEXT_TOKEN,
        "text": text
    };

    const answer = await Data.sendResponse(body);
    if(answer.error_desc) return ctx.reply("Ошибка:" + answer.error_desc);

    const uid = answer.text_uid;

    ctx.reply("Проверяем текст...")
    await setTimeout(10000);
    const body2 = {
        "userkey": process.env.TEXT_TOKEN,
        "uid": uid,
        "jsonvisible": "detail"
    };
    const answer2 = await Data.sendResponse(body2);
    console.log(answer2)
    answ = JSON.parse(answer2.spell_check)
    ctx.reply(answ[0].error_type + "\n" + answ[0].replacements)
}