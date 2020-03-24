const Discord = require('discord.js');
const express = require('express');
const path = require('path');

const client = new Discord.Client();
const { prefix, token } = require('./config.json');
const server = express();
const port = process.env.PORT || 5000;

client.on('ready', () => {
  console.log('Logged in');
});

client.on('message', msg => {
  if (msg.author.bot) return;
  if (msg.content === prefix + 'ping') msg.reply('pong');
});

client.login(token);

server.use(express.static(__dirname));

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
