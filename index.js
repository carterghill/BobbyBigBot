const Discord = require('discord.js');
const Bot = new Discord.Client();
const { config } = require("dotenv");
const { Collection }  = require("discord.js");

config({
    path: __dirname + "/.env"
});

const PREFIX = "!";
Bot.commands = new Collection();
Bot.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(Bot);
});

// When bot turns on
Bot.on('ready', () => {

    console.log('This bot is online');

    // Set the bot's status on Discord
    Bot.user.setPresence({
        status: "online",
        activity: {
            name: "Type \"!help\" for info",
            type: "PLAYING" // PLAYING, STREAMING, LISTENING, WATCHING
        }
    })

})

Bot.on('message', async msg=>{

    // If message is from the bot itself, ignore the message
    if (msg.author.bot) return;
    // if (!msg.guild) return;
    // if (!message.content.startsWith(PREFIX)) return;

    if (msg.content.includes("Bobby Big Bot")) {
        msg.reply("stfu i'm better than u");
    }

    if (msg.content.toLowerCase() === "good bot") {
        msg.channel.send("ty");
    }

    if (!msg.content.startsWith(PREFIX)) return;

    let args = msg.content.substring(PREFIX.length).split(" ");
    let cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = Bot.commands.get(cmd);
    if (!command) command = Bot.commands.get(Bot.aliases.get(cmd));

    if (command)
        command.run(Bot, msg, args);

})

// When somebody joins server, given them a couple default roles
Bot.on('guildMemberAdd', async member => {

    var gRole = member.guild.roles.cache.find(Role => Role.name.toLowerCase().includes("games"));
    await member.roles.add(gRole.id)
        .catch(e => console.log("I can't assign that role :("));

    gRole = member.guild.roles.cache.find(Role => Role.name.toLowerCase().includes("anime"));
    await member.roles.add(gRole.id)
        .catch(e => console.log("I can't assign that role :("));

});

Bot.login(process.env.TOKEN);
