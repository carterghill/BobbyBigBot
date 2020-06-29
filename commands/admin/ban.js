const fs = require(`fs`);
var data = require(`../../bans.json`);

module.exports = {

	name: "ban",
	category: "admin",
	description: "*Different from a server ban.* Prevents user from having the given role.",
	usage: "!ban <user> from <role> for <reason>",
	permissions: "BAN_MEMBERS",

	run: async (Bot, msg, args) => {

		// If the user doesn't have permission to ban on server, they can't use
		if (!msg.member.hasPermission('BAN_MEMBERS')) {
			msg.channel.send("You don't have permission");
			return;
		}

		let user = args.join(" ").split(" from ")[0];
		let role = args.join(" ").split(" from ")[1].split(" for ")[0];
		let reason = args.join(" ").split(" for ")[1];
		console.log(`${user}\n${role}\n${reason}`);

		if (!msg.mentions.members.first()) return msg.channel.send("Please provide user to ban");

		var gRole = msg.guild.roles.cache.find(Role => Role.name === role);
		if (!gRole) {
			msg.channel.send("That's not a role here");
			return;
		}

		if (!reason || reason.length < 2) return msg.channel.send("Please provide a reason");

		if (!data[role])
			data[role] = [];

		if (!data[role].includes(user)) {
			data[role].push(user);
			let text = JSON.stringify(data, null, "\t");
			fs.writeFile(`bans.json`, text, err => {
				if (err) throw err;
			});
		} else {
			msg.channel.send("User is already banned from this role");
			//return;
		}

		if (!msg.mentions.members.first().roles.cache.find(Role => Role.name === role)) {
			return;
		}
		await msg.mentions.members.first().roles.remove(gRole.id)
			.catch(e => msg.channel.send("I can't remove that role :("));

		return;
	}
}
