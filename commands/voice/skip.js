module.exports = {
  name: 'skip',
  aliases: ['s'],
  run: (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel) return message.reply('you have to be on a voice channel 😡');

    const { songDispatcher, queue } = message.guild.music;
    if (!songDispatcher) return message.reply("nothing's playing 😡");

    message.reply('song skipped');
    songDispatcher.end();
  },
};
