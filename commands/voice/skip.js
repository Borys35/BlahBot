module.exports = {
  name: 'skip',
  aliases: ['s', 'skipto'],
  run: (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel) return message.reply('you have to be on a voice channel 😡');

    const { songDispatcher, queue } = message.guild.music;
    if (!songDispatcher) return message.reply("nothing's playing 😡");

    const count = args[0];
    if (count) {
      if (count <= 0) return message.reply('invalid arg 😡');
      else queue.splice(0, count - 1);
    }

    message.reply('song skipped');
    songDispatcher.end();
  },
};
