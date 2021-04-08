require("dotenv").config();

const mineflayer = require("mineflayer");
const { WebhookClient, MessageEmbed } = require("discord.js");

if (!process.env.EMAIL) {
  console.log("Email config not found!");
  process.exit(1);
}

if (!process.env.PASSWORD) {
  console.log("Password config not found!");
  process.exit(1);
}

const whitelist = require("./whitelist.json");

const options = {
  host: "mc.hypixel.net",
  port: 25565,
  version: "1.8.9",
  verbose: true,
  username: process.env.EMAIL,
  password: process.env.PASSWORD,
};

let hook = null;

if (process.env.WEBHOOK_ID && process.env.WEBHOOK_TOKEN) {
  hook = new WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);
} else {
  console.log("Webhook config not found, not using one!");
}

function login() {
  const bot = mineflayer.createBot(options);
  bindEvents(bot);
}

let inParty = false;
const queue = [];

function processQueue(bot) {
  setTimeout(() => {
    const ign = queue.shift();
    bot.chat(`/p accept ${ign}`);
    inParty = true;

    setTimeout(() => {
      bot.chat("/p leave");
      inParty = false;

      if (queue.length >= 1) {
        processQueue(bot);
      }
    }, 5000);
  }, 200);
}

function bindEvents(bot) {
  bot.once("spawn", () => {
    console.log("Bot logged in!");
  });

  bot.chatAddPattern(/(\w*\b has invited you to join .* party!)/, "party", "Triggers when someone parties bot");

  bot.on("party", (message) => {
    const ign = message.split(" ")[0];
    if (whitelist.length >= 1 && !whitelist.includes(ign)) return;

    queue.push(ign);

    if (!inParty) {
      processQueue(bot);
    }

    console.log(`${ign} just used ${bot.username}`);

    if (!hook) return;

    const embed = new MessageEmbed()
      .setTitle(`${bot.username} Logs`)
      .setDescription(`${ign} just used ${bot.username}`)
      .setThumbnail(`https://minotar.net/helm/${ign}`)
      .setFooter("Made with <3 by mynameryan", "https://cdn.discordapp.com/avatars/272172704243908609/260db2a3f91458bce47e30432bfd4eba.png")
      .setTimestamp();

    hook.send({ embeds: [embed] }).catch((err) => {
      console.log("Error sending embed", err);
    });
  });

  bot.on("error", (err) => {
    console.log("Error", err);
  });

  bot.on("end", () => {
    console.log("Bot has ended, relogging!");
    setTimeout(login, 2000);
  });
}

login();
