require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

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

client.on('interactionCreate',(interaction)=>{
  console.log(interaction);
  interaction.reply("Pong!!");
});

client.on("messageCreate", (message) => {
  if (!message.author.bot) {
    console.log(`💬 ${message.author.username}: ${message.content}`);
    
    message.reply("hey there");
  }


});

client.login(process.env.DISCORD_TOKEN);