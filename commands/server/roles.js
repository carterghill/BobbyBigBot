module.exports = {

	name: "roles",
	category: "server",
	description: "View all roles in the server",
	usage: "!roles",
	permissions: "VIEW_CHANNEL",

	run: async (Bot, msg, args) => {

		var roles = msg.guild.roles.cache.map(Role => Role.name).join('\n');

		roles = roles.replace("@everyone\n", "");
		roles = roles.replace("Consul\n", "");
		roles = roles.replace("Senator\n", "");
		roles = roles.replace("Emperor\n", "");
		roles = roles.replace("Nigga Boosta\n", "");
		roles = roles.replace("BL MEMBER OF THE YEAR\n", "");
		roles = roles.replace("Better Pickle\n", "");
		roles = roles.replace("Pickle\n", "");
		roles = roles.replace("LATTGOD\n", "");
		roles = roles.replace("Bobby Big Bot\n", "");

		msg.channel.send("Here are the channel roles (that I can assign)\`\`\`"+roles+"\`\`\`");

		return;
	}
}
