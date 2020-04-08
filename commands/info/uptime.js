const { MessageEmbed } = require('discord.js');
const { formatDate, formatDateDiff, getHourTime } = require('../../utils');

module.exports = {
  name: 'uptime',
  run: (client, message, args) => {
    const { readyAt } = client;
    const embed = new MessageEmbed().setTitle('my uptime').addFields(
      {
        name: 'since',
        value: `${formatDate(readyAt)} (${getHourTime(readyAt)})`,
      },
      {
        name: 'for',
        value: `${formatDateDiff(readyAt, new Date())} hours`,
      }
    );
    message.channel.send(embed);
  },
};
