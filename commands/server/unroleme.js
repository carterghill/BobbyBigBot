module.exports = {

	name: "unroleme",
	category: "server",
	description: "Takes away one of your roles",
	usage: "!unroleme <role>",
	permissions: "VIEW_CHANNEL",

	run: async (Bot, msg, args) => {

		var role = args.join(" ");
		if (role === 'Senator' || role === "Consul" || role == "BL MEMBER OF THE YEAR") {
			msg.channel.send("lmao no");
			return;
		}

		var gRole = msg.guild.roles.cache.find(Role => Role.name === role);
		if (!gRole) {
			msg.channel.send("that's not a role here you dingus");
			return;
		} else {
			if (!msg.member.roles.cache.find(Role => Role.name === role)) {
				msg.channel.send("you don't have that role headass");
				return;
			}
			await msg.member.roles.remove(gRole.id)
				.catch(e => msg.channel.send("I can't remove that role :("));

			if (!msg.member.roles.cache.find(Role => Role.name === role))
				msg.channel.send("Role removed");
		}

		return;
	}
}
