require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

Discord.Structures.extend('Guild', (Guild) => {
  return class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.music = {
        queue: [],
        songDispatcher: null,
        looping: false,
      };
    }
  };
});

const client = new Discord.Client();
const commands = new Discord.Collection();
const aliases = new Discord.Collection();
const { PREFIX, TOKEN } = process.env;

fs.readdirSync('./commands').forEach((dir) => {
  fs.readdirSync(`./commands/${dir}`)
    .filter((f) => f.endsWith('.js'))
    .forEach((f) => {
      const command = require(`./commands/${dir}/${f}`);
      commands.set(command.name, command);
      if (command.aliases) {
        for (const alias of command.aliases) {
          aliases.set(alias, command.name);
        }
      }
    });
});

client.on('ready', () => {
  console.log(
    `Logged in on ${client.guilds.cache.size} guilds available for ${client.users.cache.size} users as ${client.user.tag}`
  );
  client.user.setActivity(`${PREFIX}help`);
});

client.on('message', (msg) => {
  if (msg.author.bot) return;
  if (msg.content === '❤️') return msg.channel.send('❤️');
  if (!msg.content.startsWith(PREFIX)) return;
  const args = msg.content.slice(PREFIX.length).trim().split(' ');
  const cmdName = args.shift().toLowerCase();

  const command = commands.get(cmdName) || commands.get(aliases.get(cmdName));
  if (command) command.run(client, msg, args);
});

client.login(TOKEN);
