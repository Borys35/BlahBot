module.exports = {
  name: 'repeat',
  aliases: ['r', 'loop', 'l'],
  run: (client, message, args) => {
    if (message.member.voice.channel) {
      message.guild.music.looping = !message.guild.music.looping;
      message.reply(
        message.guild.music.looping ? 'loop is on!' : 'loop is off!'
      );
    } else {
      message.reply('you have to be on voice channel 😡');
    }
  },
};
