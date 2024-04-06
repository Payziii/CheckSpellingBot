const Data = require('./data.js');
const { setTimeout } = require("timers/promises");

module.exports = async function check(conversation, ctx) {

    await ctx.reply("Введите текст (от 100 до 15000 символов)")

    let text = await conversation.wait();
    text = text.message.text;

    if(text.length < 100 ||  text.length > 15000) return ctx.reply("В вашем тексте меньше 100 или больше 15000 символов!")

    const body = {
        "userkey": process.env.TEXT_TOKEN,
        "text": text
    };

    const answer = await Data.sendResponse(body);
    if(answer.error_desc) return ctx.reply("Ошибка: " + answer.error_desc);

    const uid = answer.text_uid;

    ctx.reply("Проверяем текст...")
    await setTimeout(10000);
    const body2 = {
        "userkey": process.env.TEXT_TOKEN,
        "uid": uid,
        "jsonvisible": "detail"
    };
    const answer2 = await Data.sendResponse(body2);
    answ = JSON.parse(answer2.spell_check)
    for(let i=0; i<answ.length; i++) {
        ctx.reply(`Ошибка ${i+1}.\n\n${answ[i].error_type}: ${answ[i].reason}\n\nВарианты замены:\n<b>${answ[i].error_text}</b> ---> <b>${answ[i].replacements}</b>`,
        { parse_mode: "HTML" })
    }
}