const { readdirSync } = require("fs");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const characters = readdirSync(`./framedata/`).filter(f => f.endsWith(".json"));

var data = [];
for (let file of characters) {
	let character = file.split(".").shift();
	data[character] = require(`../../framedata/${file}`);
}

module.exports = {

	name: "framedata",
	category: "server",
	description: "Give you some frame data about melee characters",
	usage: "!framedata <character>; !framedata <character> <move>",
	permissions: "VIEW_CHANNEL",

	run: async (Bot, msg, args) => {

		if (args.length == 0) {
			msg.channel.send("Usage: \`!framedata <character>; !framedata <character> <move>\`");
		} else {

			const characters = readdirSync(`./framedata/`).filter(f => f.endsWith(".json"));

			for (let file of characters) {

				let character = file.split(".").shift();
				if (!(character.toLowerCase() === args[0].toLowerCase()))
					continue;

				if (args.length > 1 && data[character][args[1]] != null) {
					let data_string = `**${character} ${args[1]} Frame Data**\n\`\`\``;
					//data_string += JSON.stringify(data[character][args[1]]).split(",").join("\n").split(":").join(":\t");
					data_string += JSON.stringify(data[character][args[1]], null, "\t");
					data_string += "\`\`\`";
					msg.channel.send(data_string);
					continue;
				}

				//var data = require(`/home/carter/Documents/BobbyBigBot/framedata/${file}`);
				let data_string = `**${character} Frame Data**\n\`\`\``
				Object.keys(data[character]).forEach(function(key){
					if (!key.startsWith("0") && data[character][key] != null)
						data_string += `${key}:\t${data[character][key]["totalFrames"]} frames\n`;
				});
				data_string += "\`\`\`";
				msg.channel.send(data_string);
				msg.channel.send(`*For more info on an individual move, try* \`!framedata ${character} <move>\``);
			}

		}

		return;
	}
}
