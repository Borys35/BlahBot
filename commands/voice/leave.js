module.exports = {
  name: 'leave',
  run: (client, message, args) => {
    message.reply("i'm leaving");
    if (message.member.voice.channel) message.member.voice.channel.leave();
    else
      message.reply('but first you have to be on channel you dumbass!!!1@1 😡');
  }
};
