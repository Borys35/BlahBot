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
        .map((f) => {
          const cmd = require(`../${dir}/${f}`);
          if (cmd.aliases) {
            return `${cmd.name} \`(a.k.a. ${cmd.aliases.join(', ')})\``;
          } else {
            return cmd.name;
          }
        })
        .join(' | ');
      embed.addField(dir, commands);
    });
    message.channel.send(embed);
  },
};
