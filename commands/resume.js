const Discord = require("discord.js");
const songManager = require('../manager').getSongManager()
const {getDispatcher, getChannel} = require('../songManager');

module.exports = {
    name:'resume',
    description:'Resume the current song',
    execute (message, args){
        const serverId = message.guild.id;

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
                    embed.addField("Wrong", "You must be in the same channel as the bot to resume the song");
                    message.channel.send(embed);
                    return;
                }
            }
        }
    
        if(songManager.getDispatcher(serverId))
        songManager.getDispatcher(serverId).resume();
    }
}