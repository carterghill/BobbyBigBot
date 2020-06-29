const fs = require(`fs`);
var data = require(`../../bans.json`);

module.exports = {

	name: "unban",
	category: "admin",
	description: "*Different from a server ban.* Unbans user from the role.",
	usage: "!unban <user> from <role>",
	permissions: "BAN_MEMBERS",

	run: async (Bot, msg, args) => {

		// If the user doesn't have permission to ban on server, they can't use
		if (!msg.member.hasPermission('BAN_MEMBERS')) {
			msg.channel.send("You don't have permission");
			return;
		}

		let [user, role] = args.join(" ").split(" from ");
		console.log(`${user}\n${role}`);

		if (!msg.mentions.members.first()) return msg.channel.send("Please provide user to ban");

		var gRole = msg.guild.roles.cache.find(Role => Role.name === role);
		if (!gRole) {
			msg.channel.send("That's not a role here");
			return;
		}

		if (!data[role] || !data[role].includes(user)) {
			msg.channel.send(`This user isn't banned from ${role}.`);
			return;
		}

		for (let i = 0; i < data[role].length; i++) {
			if (data[role][i] === user) {
				data[role].splice(i, 1);
			}
		}

		//data[role].remove(user);
		let text = JSON.stringify(data, null, "\t");
		fs.writeFile(`bans.json`, text, err => {
			if (err) throw err;
		});

		/*var role = args.join(" ");
		if (role === 'Senator' || role === "Consul" || role === "Emperor" || role == "BL MEMBER OF THE YEAR") {
			msg.channel.send("lmao no");
			return;
		}

		var gRole = msg.guild.roles.cache.find(Role => Role.name === role);
		if (!gRole) {
			msg.channel.send("that's not a role here");
			return;
		} else {
			if (msg.member.roles.cache.find(Role => Role.name === role)) {
				msg.channel.send("you already have that role headass");
				return;
			}

			await msg.member.roles.add(gRole.id)
				.catch(e => msg.channel.send("I can't assign that role :("));

			if (msg.member.roles.cache.find(Role => Role.name === role))
				msg.channel.send("Role given :)");

			return;
		}*/

		return;
	}
}
