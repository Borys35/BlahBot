const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const Youtube = require('simple-youtube-api');

const youtube = new Youtube(process.env.YOUTUBE_API);

async function addSong(video, message) {
  const { queue } = message.guild.music;
  const song = {
    title: video.title,
    url: video.url,
    duration: video.durationSeconds,
  };
  const playing = !!queue.length;
  queue.push(song);
  if (!playing) {
    const connection = await message.member.voice.channel.join();
    play(connection, song, message);
  }
}

function play(connection, song, message) {
  const { title, url, duration } = song;

  const dispatcher = connection
    .play(
      ytdl(url, {
        filter: 'audioonly',
      })
    )
    .on('start', () => {
      message.guild.music.songDispatcher = dispatcher;
      const embed = new MessageEmbed()
        .setTitle('current song')
        .addField('title', title)
        .setURL(url);
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
      const query = args[0];
      // IF NO ARG'S GIVEN
      if (!query) {
        return message.reply('you have to give arg after the command 😡');
      }
      // CHECK FOR PLAYLIST
      else if (query.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/)) {
        try {
          const playlist = await youtube.getPlaylist(query);
          const videos = await playlist.getVideos();
          for (const video of videos) {
            addSong(video, message);
          }
        } catch (err) {
          console.error(err);
        }
      }
      // NO PLAYLIST = VIDEO LINK
      else if (
        // http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)? TRY LATER
        query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)
      ) {
        try {
          const video = await youtube.getVideo(query);
          addSong(video, message);
        } catch (err) {
          console.error(err);
        }
      }
      // NO LINK = QUERY SEARCH
      else {
        try {
          const videos = await youtube.searchVideos(query, 1);
          addSong(videos[0], message);
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      message.reply('you have to be on a voice channel 😡');
    }
  },
};
