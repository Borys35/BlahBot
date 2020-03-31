const Discord = require('discord.js');
const express = require('express');
const fs = require('fs');

Discord.Structures.extend('Guild', Guild => {
  return class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.music = {
        queue: []
      };
    }
  };
});

const client = new Discord.Client();
const commands = new Discord.Collection();
const { prefix, token } = require('./config.json');
const server = express();
const port = process.env.PORT || 5000;

fs.readdirSync('./commands').forEach(dir => {
  fs.readdirSync(`./commands/${dir}`)
    .filter(f => f.endsWith('.js'))
    .forEach(f => {
      const command = require(`./commands/${dir}/${f}`);
      commands.set(command.name, command);
    });
});

client.on('ready', () => {
  console.log(`Logged in`);
  client.user.setActivity('>help');
});

client.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(' ');
  const cmdName = args.shift().toLowerCase();

  const command = commands.get(cmdName);
  if (command) command.run(client, msg, args);
});

client.login(token);

server.use(express.static(__dirname));

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
