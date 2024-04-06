require('dotenv').config()
const { Bot, session } = require("grammy");
const { conversations, createConversation } = require("@grammyjs/conversations");
const checker = require('./checker.js');

const bot = new Bot(process.env.TG_TOKEN);
bot.use(session({ initial: () => ({}) }));

bot.use(conversations());
bot.use(createConversation(checker));

bot.command("start", async (ctx) => {
  ctx.reply("Список команд\n\n/text - Проверить текст на наличие ошибок\n/info - Информация о боте")
});

bot.command("text", async (ctx) => {
  await ctx.conversation.enter("check");
});

bot.command("info", async (ctx) => {
  ctx.reply("Создатель бота: @Payziii\nИсходный код: https://github.com/Payziii/CheckSpellingBot")
});

bot.on("callback_query:data", async (ctx) => {
  await ctx.answerCallbackQuery();
})

bot.start();