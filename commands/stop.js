const Discord = require("discord.js");
const {getChannel, disconnect} = require('../songManager');

const DJ_ROLE = process.env.DJ_ROLE_ID;

module.exports = {
    name:'stop',
    description:'Stop the player',
    execute(message, args){
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
                    embed.addField("Wrong", "You must be in the same channel as the bot to stop the song");
                    message.channel.send(embed);
                    return;
                }
            }
        }
    
        let hasDjRole = message.member._roles.includes(DJ_ROLE);
        if(hasDjRole){
            embed = new Discord.MessageEmbed();
            embed.addField("Good bye !", 'The bot has been stopped')
            message.channel.send(embed);
            disconnect();
        }
        else{
            embed = new Discord.MessageEmbed();
            embed.addField("Role missing", "You must have the DJ role to stop the bot");
            message.channel.send(embed);
            return;
        }
    }
}