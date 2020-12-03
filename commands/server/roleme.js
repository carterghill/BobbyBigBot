var bans = require(`../../bans.json`);

module.exports = {
	name: "roleme",
	category: "server",
	description: "Gives you the provided role if it exists or is not mod",
	usage: "!roleme <role>",
	permissions: "VIEW_CHANNEL",

	run: async (Bot, msg, args) => {

		var role = args.join(" ");
		if (role === 'Senator' || role === "Consul" || role === "Emperor" || role == "BL MEMBER OF THE YEAR") {
			msg.channel.send("lmao no");
			return;
		}

		// Check if the role exists
		var gRole = msg.guild.roles.cache.find(Role => Role.name === role);
		if (!gRole) {
			msg.channel.send("that's not a role here you dingus");
			return;
		} else {

			// Check if role has entry in the bans JSON
			if (bans[gRole.name] && bans[gRole.name].includes(`<@!${msg.member.id}>`)) {
				msg.channel.send("you're banned from that role!");
				return;
			}

			// Check if the user already has the role
			if (msg.member.roles.cache.find(Role => Role.name === role)) {
				msg.channel.send("you already have that role");
				return;
			}

			// Check if the role has too many permissions
			if (gRole.permissions.has('KICK_MEMBERS') ||
				gRole.permissions.has('ADMINISTRATOR') ||
				gRole.permissions.has('MANAGE_ROLES') ||
				gRole.permissions.has('BAN_MEMBERS') ||
				//gRole.permissions.has('MANAGE_SERVER') ||
				gRole.permissions.has('MANAGE_CHANNELS') ||
				gRole.permissions.has('MANAGE_MESSAGES') ||
				gRole.permissions.has('MANAGE_WEBHOOKS')) {
					msg.channel.send("Role has too many priviledges");
					return;
			}

			// Check if the role has too many permissions
			if (gRole.permissions.has('ADMINISTRATOR')) {
				msg.channel.send("role can admin");
			}

			await msg.member.roles.add(gRole.id)
				.catch(e => msg.channel.send("I can't assign that role :("));


			if (msg.member.roles.cache.find(Role => Role.name === role))
				msg.channel.send("Role given :)");

			return;
		}

		return;
	}
}
