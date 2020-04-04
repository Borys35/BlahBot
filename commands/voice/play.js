const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');

function play(connection, song, message) {
  const { title, video_url } = song;

  const dispatcher = connection
    .play(
      ytdl(video_url, {
        filter: 'audioonly',
      })
    )
    .on('start', () => {
      message.guild.music.songDispatcher = dispatcher;
      const embed = new MessageEmbed()
        .setTitle('current song')
        .addField('title', title)
        .setURL(video_url);
      message.channel.send(embed);
    })
    .on('finish', () => {
      const { queue } = message.guild.music;
      queue.shift();
      if (!queue.length) message.reply('no more songs 😩');
      else play(connection, queue[0], message);
    })
    .on('error', () => {
      message.reply('error...');
      setTimeout(() => message.reply("and it's may be even mine 😩"), 1000);
    });
}

module.exports = {
  name: 'play',
  run: async (client, message, args) => {
    message.reply('yes your grace');
    if (message.member.voice.channel) {
      const { queue } = message.guild.music;
      const url = args[0];
      if (!url)
        return message.reply('you have to give song link after the command 😡');
      try {
        const playing = !!queue.length;
        const song = (({ title, video_url }) => ({ title, video_url }))(
          await ytdl.getInfo(url)
        );
        queue.push(song);

        if (!playing) {
          const connection = await message.member.voice.channel.join();
          play(connection, song, message);
        }
      } catch (err) {
        console.error(err);
        message.reply('invalid url 😡');
      }
    } else {
      message.reply('you have to be on a voice channel 😡');
    }
  },
};
