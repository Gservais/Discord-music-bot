const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const queue = require('../songManager').getQueue();
const {setChannel, playSong, defineDispatcher, getConnection, setConnection, getChannel} = require('../songManager');

module.exports = async (message, args)=>{
    var userChannel = message.member.voice.channel;
    if(!userChannel){
        embed = new Discord.MessageEmbed();
        embed.addField("Can't join", 'You must be in a vocal channel !')
        require('./index').commandAnswer(message, embed);
        return;
    }
    else{
        if(!getChannel()){
            setChannel(userChannel);
        }
        else{
            if(getChannel().id !== userChannel.id){
                embed = new Discord.MessageEmbed();
                embed.addField("Bot already in use", "The bot is already used in another channel");
                require('./index').commandAnswer(message, embed);
                return;
            }
        }
    }

    const permissions = getChannel().permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        embed = new Discord.MessageEmbed();
        embed.addField("Can't join", "I don't have the permissions to join this channel")
        require('./index').commandAnswer(message, embed);
        return;
    }

    const SONG_URL = args[0];
    if(!SONG_URL){
        embed = new Discord.MessageEmbed();
        embed.addField("Missing argument", "Please specify the url of the song");
        embed.addField("Command template", "<prefix>play <song url>")
        require('./index').commandAnswer(message, embed);
        return;
    }

    const songInfo = await ytdl.getInfo(SONG_URL);
    const song = {
        title: songInfo.title,
        url: songInfo.video_url,
    };

    queue.addSong(song);
    if(queue.songs.length > 1){
        embed = new Discord.MessageEmbed();
        embed.addField("Song added", "The song has been added to the queue")
        require('./index').commandAnswer(message, embed);
    }

    if(!getConnection()){
        const nextSong = queue.nextSong();
        setConnection(await getChannel().join());
        playSong(nextSong, message);
        defineDispatcher(message);
    }
}