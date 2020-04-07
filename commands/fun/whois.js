const { names } = require('./whois-names.json');

module.exports = {
  name: 'whois',
  run: (client, message, args) => {
    const user = args[0];
    if (!user) return message.reply('who is who?! 😡');
    const name = names[Math.round(Math.random() * (names.length - 1))];
    message.reply(
      message.author === message.mentions.users.first()
        ? `you are ${name}`
        : `${user} is ${name}`
    );
  },
};
