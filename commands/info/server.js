const { MessageEmbed } = require('discord.js');
const { formatDate } = require('../../utils');

module.exports = {
  name: 'server',
  run: (client, message, args) => {
    const { guild } = message;
    const embed = new MessageEmbed()
      .setTitle(`${guild.name} info`)
      .setColor('#d21919')
      .addFields(
        { name: 'name', value: guild.name },
        { name: 'owner', value: guild.owner },
        { name: 'id', value: guild.id },
        { name: 'region', value: guild.region },
        { name: 'created at', value: formatDate(guild.createdAt) },
        { name: 'member count', value: guild.memberCount },
        { name: 'roles', value: guild.roles.cache.array().join(', ') },
        {
          name: 'emojis',
          value: !!guild.emojis.cache.array().length
            ? guild.emojis.cache.array()
            : 'no emojis ;c',
        }
      );
    message.channel.send(embed);
  },
};
