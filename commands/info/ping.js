module.exports = {
  name: 'ping',
  run: async (client, message, args) => {
    const msg = await message.channel.send('pinging...');
    msg.edit(
      `pong!\nyour latency is ${msg.createdTimestamp -
        message.createdTimestamp}ms.`
    );
  }
};
