const { MessageEmbed } = require('discord.js');
const { formatDate } = require('../../utils');

module.exports = {
  name: 'user',
  run: (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    const member = message.mentions.members.first() || message.member;
    const embed = new MessageEmbed()
      .setTitle(`${user.username} info`)
      .setColor('#d21919')
      .addFields(
        { name: 'username', value: user.username, inline: true },
        {
          name: 'nickname',
          value: member.nickname || 'no nickname',
          inline: true,
        },
        { name: 'id', value: user.id },
        { name: 'tag', value: user.tag },
        {
          name: 'joined',
          value: `#${
            member.guild.members.cache
              .sort((m1, m2) => m1.joinedTimestamp - m2.joinedTimestamp)
              .array()
              .findIndex((m) => m.id === member.id) + 1
          }`,
        },
        {
          name: 'joined server',
          value: formatDate(member.joinedAt),
          inline: true,
        },
        {
          name: 'joined discord',
          value: formatDate(user.createdAt),
          inline: true,
        },
        {
          name: 'roles',
          value: member.roles.cache.array().join(', '),
        }
      );
    message.channel.send(embed);
  },
};
