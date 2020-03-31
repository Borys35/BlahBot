module.exports = {
  name: 'say',
  run: (client, message, args) => {
    if (!args.length) return message.reply("i can't say nothing");
    const msg = args.join(' ');
    message.delete().catch(err => console.error(err));
    message.channel.send(msg);
  }
};
