const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'queue',
  aliases: ['q'],
  run: (client, message, args) => {
    const { queue } = message.guild.music;
    if (!queue.length) return message.reply('queue is empty');
    const embed = new MessageEmbed()
      .setTitle('queue')
      .setDescription(`${queue.length} songs`);
    for (let i = 0; i < queue.length; i++) {
      embed.addField(`song #${i + 1}`, queue[i].title);
    }
    message.channel.send(embed);
  },
};
