require('dotenv').config();
const {
    deleteMessage, 
    addRole, 
    removeRole,
    kick,
    playSong,
    pauseSong,
    resumeSong,
    stopSong,
    skipSong
} = require('./commands');
const Discord = require("discord.js");
const client = new Discord.Client();

const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;


client.login(TOKEN);

client.on('ready', ()=>{
    console.log('Connected');
});

client.on('message', async message =>{
    if(message.author.bot) return;
    if(message.content.indexOf(PREFIX) !== 0) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(command === 'delete')
        deleteMessage(message,args);

    if(command === 'add-role')
        addRole(message, args);

    if(command === 'remove-role')
        removeRole(message, args);

    if(command === 'kick')
        kick(message, args);

    if(command === 'play')
        playSong(message, args);

    if(command === 'pause')
        pauseSong(message, args);

    if(command === 'resume')
        resumeSong(message, args);

    if(command === 'stop')
        stopSong(message, args);

    if(command === 'skip')
        skipSong(message, args);

    if(command === 'gnegne'){
        message.channel.send((gnegnegne(args.join(' '))));
    }

});

function gnegnegne(sentence){
    let gnegneSentence = "";
    for(let i = 0; i < sentence.length; i++){
        gnegneSentence += Math.random() >= 0.5 ? sentence[i].toUpperCase() : sentence[i];
    }
    return gnegneSentence;
}