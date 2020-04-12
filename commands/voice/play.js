const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const Youtube = require('simple-youtube-api');
const { formatDuration } = require('../../utils');

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

  const embed = new MessageEmbed()
    .setTitle('added song')
    .setURL(song.url)
    .addField('title', song.title)
    .addField('duration', formatDuration(song.duration));
  message.channel.send(embed);

  if (!playing) {
    const connection = await message.member.voice.channel.join();
    play(connection, song, message);
  }
}

async function addPlaylist(playlist, message) {
  const { queue } = message.guild.music;
  const playing = !!queue.length;
  const videos = await playlist.getVideos();
  let duration = 0;
  for (const video of videos) {
    const fetched = await video.fetch();
    const song = {
      title: fetched.title,
      url: fetched.url,
      duration: fetched.durationSeconds,
    };
    duration += song.duration;
    queue.push(song);
  }

  const embed = new MessageEmbed()
    .setTitle('added playlist')
    .setURL(playlist.url)
    .addField('title', playlist.title)
    .addField('songs', videos.length)
    .addField('duration', formatDuration(duration));
  message.channel.send(embed);

  if (!playing) {
    const connection = await message.member.voice.channel.join();
    play(connection, queue[0], message);
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
        .setURL(url)
        .addField('title', title)
        .addField('duration', formatDuration(duration));
      message.channel.send(embed);
    })
    .on('finish', () => {
      const { queue, looping } = message.guild.music;
      if (!looping) queue.shift();
      if (!queue.length) {
        message.reply('no more songs 😩');
        const { channel } = message.guild.me.voice;
        if (channel) channel.leave();
      } else {
        play(connection, queue[0], message);
      }
    })
    .on('error', () => {
      message.reply('error, try again later');
    });
}

module.exports = {
  name: 'play',
  aliases: ['p', 'add'],
  run: async (client, message, args) => {
    if (message.member.voice.channel) {
      const query = args.join(' ');
      // IF NO ARG'S GIVEN
      if (!query) {
        return message.reply('you have to give arg after the command 😡');
      }
      // CHECK FOR PLAYLIST
      else if (query.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/)) {
        try {
          const playlist = await youtube.getPlaylist(query);
          addPlaylist(playlist, message);
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
          const video = await videos[0].fetch();
          addSong(video, message);
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      message.reply('you have to be on a voice channel 😡');
    }
  },
};
