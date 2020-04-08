module.exports = {
  name: 'about',
  run: (client, message, args) => {
    message.reply(
      `\nhi, i'm blah.\n---------------------------\nmy main features are: \`playing music | funny fun commands | giving info about really interesting things blah blah blah\`\n---------------------------\nfor my all commands type \`${process.env.PREFIX}commands\`\n---------------------------\nfor invite link type \`${process.env.PREFIX}invite\`\n---------------------------\nmy source code there: https://github.com/Borys35/BlahBot`
    );
  },
};
