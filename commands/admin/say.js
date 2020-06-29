module.exports = {
	name: "say",
	category: "admin",
	description: "Let Bobby speak!",
	usage: "!say <channel> <words>",
	permissions: "ADMINISTRATOR",

	run: async (Bot, msg, args) => {

		if (!msg.member.roles.cache.find(Role => Role.name === "Senator") &&
		!msg.member.roles.cache.find(Role => Role.name === "Consul") &&
		!msg.member.roles.cache.find(Role => Role.name === "Emperor")) {
			return;
		}

		if (msg.deleteable) msg.delete();

		if (args.length == 0)
			return;

		var channel = msg.guild.channels.cache.find(chan => chan.name === args[0]);
		if (channel) {
			args.shift();
			channel.send(args.join(" "));
		} else {
			msg.channel.send("Couldn't find that channel!");
		}

		return;
	}
}
