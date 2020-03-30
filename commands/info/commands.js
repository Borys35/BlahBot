const fs = require('fs');

module.exports = {
  name: 'commands',
  run: (client, message, args) => {
    let result = 'my commands are:';
    fs.readdirSync('./commands').forEach(dir => {
      result += `\n**${dir}:**\n`;
      fs.readdirSync(`./commands/${dir}`).forEach(file => {
        const { name } = require(`../${dir}/${file}`);
        result += `${name}, `;
      });
      result += '\n';
    });
    message.reply(result);
  }
};
