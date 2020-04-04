module.exports = {
  name: 'leave',
  run: (client, message, args) => {
    const { channel } = message.member.voice;
    message.reply("i'm leaving");
    if (channel) channel.leave();
    else
      message.reply('but first you have to be on channel you dumbass!!!1@1 😡');
  },
};
