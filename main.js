const { Client, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client();
client.commands = new Collection();

fs.readdir('./events/', (err, files)=>{
    if(err) return console.error(err);

    files.forEach(file=>{
        if(!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`)
        const evtName = file.split('.')[0];
        client.on(evtName, evt.bind(null, client))
    })
})


fs.readdir('./commands/', (err, files)=>{
    if(err) return console.error(err);

    files.forEach(file=>{
        if(!file.endsWith('.js')) return;
        const command = require(`./commands/${file}`)
        const commandName = file.split('.')[0];
        client.commands.set(commandName, command);
    })
})

client.login();