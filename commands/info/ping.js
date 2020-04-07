module.exports = {
  name: 'ping',
  run: async (client, message, args) => {
    const msg = await message.channel.send('pinging...');
    msg.edit(
      `pong!\nlatency is ${msg.createdTimestamp - message.createdTimestamp}ms.`
    );
  },
};
