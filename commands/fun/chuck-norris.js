const fetch = require('node-fetch');

module.exports = {
  name: 'norris',
  aliases: ['chuck', 'chucknorris'],
  run: async (client, message, args) => {
    const { value } = await fetch(
      'https://api.chucknorris.io/jokes/random'
    ).then((res) => res.json());
    message.reply(value);
  },
};
