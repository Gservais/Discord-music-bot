const Discord = require("discord.js");
const {getChannel, disconnect} = require('../songManager');

const DJ_ROLE = process.env.DJ_ROLE_ID;

module.exports = (message, args)=>{
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
        embed = new Discord.MessageEmbed();
        embed.addField("Good bye !", 'The bot has been stopped')
        require('./index').commandAnswer(message, embed);
        disconnect();
    }
    else{
        embed = new Discord.MessageEmbed();
        embed.addField("Role missing", "You must have the DJ role to stop the bot");
        require('./index').commandAnswer(message, embed);
        return;
    }
}