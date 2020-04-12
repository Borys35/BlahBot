module.exports = {
  name: 'repeat',
  aliases: ['r', 'loop'],
  run: (client, message, args) => {
    const { looping } = message.guild.music;
    looping = !looping;
    message.reply(looping ? 'loop is on!' : 'loop is off!');
  },
};
