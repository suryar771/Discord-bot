require("dotenv").config();
const { REST, Routes } = require("discord.js");

// Define your slash commands
const commands = [
    {
        name: "ping",
        description: "Replies with Pong!",
    },
    {
        name: "create",
        description: "Shortens a URL",
        options: [
          {
            name: "url",
            type: 3, // STRING
            description: "URL to shorten",
            required: true,
          },
        ],
      }
];

// Create REST client instance with your bot token
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// Deploy the slash commands
(async () => {
    try {
        console.log("⏳ Started refreshing application (/) commands...");

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID), // For global commands
            { body: commands }
        );

        console.log("✅ Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error("❌ Error reloading commands:", error);
    }
})();