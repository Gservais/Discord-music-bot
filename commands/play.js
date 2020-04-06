const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const songManager = require('../manager').getSongManager()
const Youtube = require('simple-youtube-api');
const { youtube_api_token } = require('../config');
const youtube = new Youtube(youtube_api_token);

const YOUTUBE_URL_REGEX = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';

async function awaitAnswer(message, results){
        var response = await message.channel.awaitMessages(msg=>((msg.content > 0 && msg.content < results.length+1) || msg.content === 'exit'), {
            max: 1,
            maxProcessed: 1,
            time: 60000,
            errors: ['time']
        })
        
        if(!response.first()){
            await message.channel.send(
                `Please try again and enter a number between 1 and ${results.length} or exit`
            );
            return await awaitAnswer(message, results);
        }
        else
            return parseInt(response.first().content);
}

module.exports = {
    name:'play',
    description:'Play a song with a given name or URL',
    async execute(message, args){
        const serverId = message.guild.id;
        const queue = songManager.getQueue(serverId);
    
        var userChannel = message.member.voice.channel;
        if(!userChannel){
            embed = new Discord.MessageEmbed();
            embed.addField("Can't join", 'You must be in a vocal channel !')
            message.channel.send(embed);
            return;
        }
        else{
            if(!songManager.getChannel(serverId)){
                songManager.setChannel(serverId, userChannel);
            }
            else{
                if(songManager.getChannel(serverId).id !== userChannel.id){
                    embed = new Discord.MessageEmbed();
                    embed.addField("Bot already in use", "The bot is already used in another channel");
                    message.channel.send(embed);
                    return;
                }
            }
        }
    
        const permissions = songManager.getChannel(serverId).permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            embed = new Discord.MessageEmbed();
            embed.addField("Can't join", "I don't have the permissions to join this channel")
            message.channel.send(embed);
            return;
        }
    
        let SONG_URL = args[0];
        if(!SONG_URL){
            embed = new Discord.MessageEmbed();
            embed.addField("Missing argument", "Please specify the url of the song");
            embed.addField("Command template", "<prefix>play <song url>")
            message.channel.send(embed);
            return;
        }

        if(!SONG_URL.match(YOUTUBE_URL_REGEX)){
            const results = await youtube.searchVideos(args.join(' '), 5);
            const embed = new Discord.MessageEmbed()
                .setTitle('Choose a song');
            results.forEach((value, index)=> embed.addField(`Song ${index + 1}`, value.title));
            embed.setFooter(`exit to cancel`);

            await message.channel.send(embed)
            const userChoice = await awaitAnswer(message, results);
        
            if(isNaN(userChoice))
                return;

            SONG_URL = `${YOUTUBE_BASE_URL}${results[userChoice - 1].id}`
        }


        const songInfo = await ytdl.getInfo(SONG_URL).catch(err=>console.log('err'));
        const song = {
            title: songInfo.title,
            url: songInfo.video_url,
        };

        queue.addSong(song);
        if(queue.songs.length > 1){
            embed = new Discord.MessageEmbed();
            embed.addField("Song added", `**${songInfo.title}** has been added to the queue`)
            message.channel.send(embed);
        }
        
        if(!songManager.getConnection(serverId)){
            const nextSong = queue.nextSong();
            songManager.setConnection(serverId, await songManager.getChannel(serverId).join());
            songManager.playSong(serverId, nextSong, message);
            songManager.defineDispatcher(serverId, message);
        }
    }
}