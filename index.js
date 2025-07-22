require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const fetch = require("node-fetch");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "create") {
    const url = interaction.options.getString("url");
    console.log("Received URL:", url);

    try {
      const response = await fetch("https://api.tinyurl.com/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.TINYURL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data?.data?.tiny_url) {
        await interaction.reply(`🔗 Shortened URL: ${data.data.tiny_url}`);
      } else {
        console.error("TinyURL response error:", data);
        await interaction.reply("❌ Failed to shorten URL. Invalid response.");
      }
    } catch (err) {
      console.error("TinyURL fetch error:", err);
      await interaction.reply("❌ Failed to shorten URL. Please try again later.");
    }
  }
});

client.on("messageCreate", (message) => {
  if (!message.author.bot) {
    console.log(`💬 ${message.author.username}: ${message.content}`);
    message.reply("hey there");
  }
});

client.login(process.env.DISCORD_TOKEN);