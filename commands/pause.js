const Discord = require("discord.js");
const songManager = require('../manager').getSongManager()

module.exports = {
    name:'pause',
    description:'Pause the song if something is played',
    execute (message, args){
        let userChannel = message.member.voice.channel;
        const serverId = message.guild.id;
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
                    embed.addField("Wrong", "You must be in the same channel as the bot to pause the song");
                    message.channel.send(embed);
                    return;
                }
            }
        }
    
        if(songManager.getDispatcher(serverId))
            songManager.getDispatcher(serverId).pause();
    }
}