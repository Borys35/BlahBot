const { PREFIX } = process.env;

module.exports = {
  name: 'help',
  run: (client, message, args) => {
    message.reply(
      `\nmy prefix is \`${PREFIX}\`\nfor more commands go for \`commands\``
    );
  },
};
