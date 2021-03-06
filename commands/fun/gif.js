const fetch = require('node-fetch');
const { TENOR_API } = process.env;

module.exports = {
  name: 'gif',
  run: async (client, message, args) => {
    let search = args[0];
    if (!search) {
      search = 'sad';
      message.reply('you know, you can add argument here, right? 😟');
    }
    const { results } = await fetch(
      `https://api.tenor.com/v1/random?q=${search}&key=${TENOR_API}&limit=1&contentfilter=high`
    ).then((res) => res.json());
    message.reply(results[0].url);
  },
};
