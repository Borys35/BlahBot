module.exports = {
  name: 'clear',
  aliases: ['leave'],
  run: (client, message, args) => {
    message.guild.music.queue = [];
    message.reply('queue has been cleared');
    const { channel } = message.guild.me.voice;
    if (channel) {
      channel.leave();
    }
  },
};
