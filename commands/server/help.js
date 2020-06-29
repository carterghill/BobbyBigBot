module.exports = {

	name: "help",
	category: "server",
	description: "You're the type of person who Google's Google",
	usage: "!help; !help <command>",
	permissions: "VIEW_CHANNEL",

	run: async (Bot, msg, args) => {

		if (args.length == 0) {
			msg.channel.send("Hi! I'm here to do stuff for you. Here's a list of commands you can try:\n\n");
			let cmds = Bot.commands.filter(c => msg.member.hasPermission(c.permissions));
			cmds = cmds.map(c => "!"+c.name).join("\n");
			//cmds = cmds.replace("!say", "");
			//cmds = cmds.replace("!ban", "");
			msg.channel.send("\`\`\`"+cmds+"\`\`\`");
			msg.channel.send("For more information about a command, type \`!help <command>\`");
		} else {
			var cmd = Bot.commands.find(c => c.name === args[0]);
			if (cmd) {
				msg.channel.send('**'+cmd.name+':** ' + cmd.description + '\n'+'Usage:\`'+cmd.usage+'\`\n');
			} else {
				msg.channel.send("Command not found!");
			}
		}

		return;
	}
}
