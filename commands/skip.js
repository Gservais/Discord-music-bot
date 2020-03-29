const Discord = require("discord.js");
const songManager = require('../manager').getSongManager()

const DJ_ROLE = process.env.DJ_ROLE_ID;

module.exports = {
    name:'skip',
    description:'Skip the current song',
    execute(message, args){
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
                embed = new Discord.MessageEmbed();
                embed.addField("Bot isn't used", "The bot isn't connected to any channel !")
                message.channel.send(embed);
                return;
            }
            else{
                if(songManager.getChannel(serverId).id !== userChannel.id){
                    embed = new Discord.MessageEmbed();
                    embed.addField("Wrong", "You must be in the same channel as the bot to stop the song");
                    message.channel.send(embed);
                    return;
                }
            }
        }
    
        // let hasDjRole = message.member._roles.includes(DJ_ROLE);
        // if(hasDjRole){
        queue.skipSong();
        const nextSong = queue.nextSong();
        if(nextSong){
            songManager.playSong(serverId, nextSong, message);
            songManager.defineDispatcher(serverId,message);
        }
        else{
            songManager.disconnect(serverId);
        }
        // }
        // else{
        //     embed = new Discord.MessageEmbed();
        //     embed.addField("Role missing", "You must have the DJ role to skip the song");
        //     message.channel.send(embed);
        //     return;
        // }
    
    }
}