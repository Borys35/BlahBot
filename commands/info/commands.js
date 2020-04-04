const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'commands',
  run: (client, message, args) => {
    const embed = new MessageEmbed().setTitle('commands');
    fs.readdirSync('./commands').forEach((dir) => {
      const commands = fs
        .readdirSync(`./commands/${dir}`)
        .filter((f) => f.endsWith('.js'))
        .map((f) => (f = require(`../${dir}/${f}`).name))
        .join(', ');
      embed.addField(dir, commands);
    });
    message.channel.send(embed);
  },
};
