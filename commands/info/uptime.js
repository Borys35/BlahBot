const { MessageEmbed } = require('discord.js');
const { formatDate, formatDateDiff } = require('../../utils');

module.exports = {
  name: 'uptime',
  run: (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle('my uptime')
      .addFields(
        { name: 'since', value: formatDate(client.readyAt) },
        {
          name: 'for',
          value: `${formatDateDiff(client.readyAt, new Date())} hours`,
        }
      );
    message.channel.send(embed);
  },
};
