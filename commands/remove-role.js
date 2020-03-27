const Discord = require("discord.js");

module.exports = {
    name:'remove-role',
    description:'Remove a specific role to a specific user',
    adminOnly:true,
    
    execute (message, args){    
        if(args[0] === undefined || args[1] === undefined){
            embed = new Discord.MessageEmbed();
            embed.addField('Wrong args', 'Please mention the missing user or role!');
            embed.addField('Command template', '<prefix>remove-role <user> <role>');
            message.channel.send(embed);
            return;
        }
    
        let user = message.mentions.members.first();
        let roleToRemove = message.guild.roles.cache.find(role => role.name === args.slice(1, args.length).join(" "));
    
        if(user === undefined){
            embed = new Discord.MessageEmbed();
            embed.addField('Unknown user', 'Please mention a known user !');
            message.channel.send(embed);
            return;
        }
    
        if(roleToRemove === undefined){
            embed = new Discord.MessageEmbed();
            embed.addField('Unknown role', 'Please mention a known role !');
            message.channel.send(embed);
            return;
        }
        if(!user.roles.cache.find(role => role.name === roleToRemove.name)){
            embed = new Discord.MessageEmbed();
            embed.addField('Role is not assigned', `${user.user.username} has not this role !`);
            message.channel.send(embed);
            return;
        }
        else user.roles.remove(roleToRemove);
    
        embed = new Discord.MessageEmbed();
        embed.addField('Role has been removed', `${user.user.username} isn't ${roleToRemove.name} anymore!`);
        message.channel.send(embed);
    }
}