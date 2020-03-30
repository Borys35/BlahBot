module.exports = {
  name: 'join',
  run: (client, message, args) => {
    message.reply('give me a sec');
    if (message.member.voice.channel) message.member.voice.channel.join();
    else message.reply('you have to be on a voice channel 😡');
  }
};
