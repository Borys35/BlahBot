module.exports = {
  name: 'pause',
  run: (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel) return message.reply('you have to be on a voice channel 😡');

    const { songDispatcher } = message.guild.music;
    if (!songDispatcher) return message.reply("nothing's playing 😡");

    message.reply('song paused');
    songDispatcher.pause();
  },
};
