const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'commands',
  run: (client, message, args) => {
    // const category = args[0];
    // if (category) {
    //   if (fs.existsSync(`./commands/${category}`)) {
    //     const embed = new MessageEmbed().setTitle(`${category} commands`);
    //     fs.readdirSync(`./commands/${category}`)
    //       .filter((f) => f.endsWith('.js'))
    //       .map((f) => (f = require(`../${category}/${f}`)))
    //       .forEach((f) => {
    //         embed.addField(f.name, `aliases: ${f.aliases.join(', ')}`);
    //       });
    //     message.channel.send(embed);
    //   } else {
    //     message.reply('there is no such category 😡');
    //   }
    // } else {
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
    //}
  },
};
