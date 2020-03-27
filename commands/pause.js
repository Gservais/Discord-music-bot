const Discord = require("discord.js");
const {getDispatcher, getChannel} = require('../songManager');

module.exports = {
    name:'pause',
    description:'Pause the song if something is played',
    execute (message, args){
        var userChannel = message.member.voice.channel;
        if(!userChannel){
            embed = new Discord.MessageEmbed();
            embed.addField("Can't join", 'You must be in a vocal channel !')
            message.channel.send(embed);
            return;
        }
        else{
            if(!getChannel()){
                embed = new Discord.MessageEmbed();
                embed.addField("Bot isn't used", "The bot isn't connected to any channel !")
                message.channel.send(embed);
                return;
            }
            else{
                if(getChannel().id !== userChannel.id){
                    embed = new Discord.MessageEmbed();
                    embed.addField("Wrong", "You must be in the same channel as the bot to pause the song");
                    message.channel.send(embed);
                    return;
                }
            }
        }
    
        if(getDispatcher())
            getDispatcher().pause();
    }
}