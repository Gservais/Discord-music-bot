const Discord = require("discord.js");
const {getChannel, playSong, defineDispatcher, disconnect} = require('../songManager');

const DJ_ROLE = process.env.DJ_ROLE_ID;

module.exports = {
    name:'skip',
    description:'Skip the current song',
    execute(message, args){
        const queue = require('../songManager').getQueue();
        
        var userChannel = message.member.voice.channel;
        if(!userChannel){
            embed = new Discord.MessageEmbed();
            embed.addField("Can't join", 'You must be in a vocal channel !')
            require('./index').commandAnswer(message, embed);
            return;
        }
        else{
            if(!getChannel()){
                embed = new Discord.MessageEmbed();
                embed.addField("Bot isn't used", "The bot isn't connected to any channel !")
                require('./index').commandAnswer(message, embed);
                return;
            }
            else{
                if(getChannel().id !== userChannel.id){
                    embed = new Discord.MessageEmbed();
                    embed.addField("Wrong", "You must be in the same channel as the bot to stop the song");
                    require('./index').commandAnswer(message, embed);
                    return;
                }
            }
        }
    
        let hasDjRole = message.member._roles.includes(DJ_ROLE);
        if(hasDjRole){
            queue.skipSong();
            const nextSong = queue.nextSong();
            if(nextSong){
                playSong(nextSong, message);
                defineDispatcher(message);
            }
            else{
                disconnect();
            }
        }
        else{
            embed = new Discord.MessageEmbed();
            embed.addField("Role missing", "You must have the DJ role to skip the song");
            require('./index').commandAnswer(message, embed);
            return;
        }
    
    }
}