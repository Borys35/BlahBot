module.exports = {
  name: 'say',
  run: (client, message, args) => {
    if (!args.length) return message.reply("i can't say nothing 😡");
    const msg = args.join(' ');
    message.delete().catch(console.error);
    message.channel.send(msg);
  },
};
