const Discord = require("discord.js");

module.exports = {
    name:'delete',
    description:'Delete a specific number of messages',
    execute(message, args){
        if(args[0] === undefined || (isNaN(args[0]) && args[0] !== 'all')){
            embed = new Discord.MessageEmbed();
            embed.addField('Wrong args', 'Please specify either the number of messages to delete or all !');
            embed.addField('Command template', '<prefix>delete <number> | <all>');
            require('./index').commandAnswer(message, embed);
            return;
        }
    
        if(!require('./index').checkIfAdmin(message)) return;
    
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
            require('./index').commandAnswer(message, embed);
        });
    }
}