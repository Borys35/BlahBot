const fetch = require('node-fetch');

module.exports = {
  name: 'randomnickname',
  run: async (client, message, args) => {
    let { nickname, success } = await fetch(
      'https://api.codetunnel.net/random-nick',
      {
        method: 'POST',
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' },
      }
    ).then((res) => res.json());
    if (!success) return message.reply('sorry, try again 😩');
    nickname = nickname.toLowerCase();
    message.member
      .setNickname(nickname)
      .then(() => message.reply('welcome!'))
      .catch(() => {
        message.reply(
          `i can't set your username, but i would use \`${nickname}\``
        );
      });
  },
};
