module.exports = {
  name: '8ball',
  run: (client, message, args) => {
    const question = args[0];
    if (!question) return message.reply('you have to ask me a question 😡');
    const answers = [
      'yes',
      'no',
      'maybe',
      'i think so',
      'no way',
      'absolutely'
    ];
    const ans = answers[Math.round(Math.random() * (answers.length - 1))];
    message.reply(ans);
  }
};
