const Discord = require("discord.js");

module.exports = (message, args)=>{
    if(!require('./index').checkIfAdmin(message)) return;

    let userToKick = message.mentions.members.first();

    if(userToKick === undefined){
        embed = new Discord.MessageEmbed();
        embed.addField('Unknown user', 'Please mention a known user !');
        require('./index').commandAnswer(message, embed);
        return; 
    }

    userToKick.kick().then(()=>{
        embed = new Discord.MessageEmbed();
        embed.addField('User kicked', `Goodbye ${userToKick.user.username} :)`);
        require('./index').commandAnswer(message, embed);
    });
}