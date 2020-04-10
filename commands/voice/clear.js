module.exports = {
  name: 'clear',
  aliases: ['c', 'leave', 'skipall'],
  run: (client, message, args) => {
    message.guild.music.queue = [];
    message.reply('queue has been cleared');
    const { channel } = message.guild.me.voice;
    if (channel) {
      channel.leave();
    }
  },
};
