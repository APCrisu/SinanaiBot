const Discord = require("discord.js");
const express = require("express");

const package = require("./package.json");

const wait = second =>
  new Promise(resolve => setTimeout(resolve, second * 1000));

(async () => {
  const bot = new Discord.Client({
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING
    ]
  });
  const server = express();

  // botのイベント登録

  // 準備完了
  bot.once("ready", () => {
    console.log("Ready to bot!");
  });

  // メッセージ受信
  bot.on("messageCreate", message => {
    if (message.author.id === bot.user.id) return;
    message.reply("Hello, World!");
  });

  // 開始
  bot.login(process.env.BOT_TOKEN);
  server.get("/", (req, res) =>
    res.send(`<h1>${package.name} is working!</h1>`)
  );
  server.listen(3000, () => console.log("Ready to server!"));
})();
