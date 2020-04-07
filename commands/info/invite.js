module.exports = {
  name: 'invite',
  run: (client, message, args) => {
    message.reply(
      'https://discordapp.com/api/oauth2/authorize?client_id=691965975737925662&permissions=8&scope=bot'
    );
  },
};
