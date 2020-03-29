const Discord = require("discord.js");

module.exports = {
    name:'delete',
    description:'Delete a specific number of messages',
    adminOnly:true,
    args:['number | all'],
    execute(message, args){
        if(args[0] === undefined || (isNaN(args[0]) && args[0] !== 'all')){
            embed = new Discord.MessageEmbed();
            embed.addField('Wrong args', 'Please specify either the number of messages to delete or all !');
            embed.addField('Command template', '<prefix>delete <number> | <all>');
            message.channel.send(embed);
            return;
        }
        
        message.channel.messages.fetch().then(async (messages) => {      
            let msgToDelete = messages.array();
    
            if(args[0] !== 'all'){
                let nbMsgToDelete = Number(args[0]) + 1;
                msgToDelete = msgToDelete.slice(messages.length-nbMsgToDelete, nbMsgToDelete);
            }
            
            for(let i = 0; i < msgToDelete.length; i++){
                await msgToDelete[i].delete();
            }
            
            embed = new Discord.MessageEmbed();
            embed.addField('Messages deleted', `${args[0] === 'all'? 'All': args[0]} message(s) deleted`);
            message.channel.send(embed);
        });
    }
}