module.exports = {
  name: 'join',
  run: (client, message, args) => {
    const { channel } = message.member.voice;
    message.reply('give me a sec');
    if (channel) channel.join();
    else message.reply('you have to be on a voice channel 😡');
  },
};
