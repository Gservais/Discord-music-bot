const Discord = require("discord.js");

module.exports = {
    name:"add-role",
    description:"Add a specific role to a specific user",
    adminOnly:true,
    args:['user', 'role'],
    execute(message, args){    
        if(args[0] === undefined || args[1] === undefined){
            embed = new Discord.MessageEmbed();
            embed.addField('Wrong args', 'Please mention the missing user or role!');
            embed.addField('Command template', '<prefix>add-role <user> <role>');
            message.channel.send(embed);
            return;
        }

        let user = message.mentions.members.first();
        let roleToAdd = message.guild.roles.cache.find(role => role.name === args.slice(1, args.length).join(" "));

        if(user === undefined){
            embed = new Discord.MessageEmbed();
            embed.addField('Unknown user', 'Please mention a known user !');
            message.channel.send(embed);
            return;
        }

        if(roleToAdd === undefined){
            embed = new Discord.MessageEmbed();
            embed.addField('Missing role', 'Please mention a known role !');
            message.channel.send(embed);
            return;
        }

        if(user.roles.cache.find(role => role.name === roleToAdd.name)){
            embed = new Discord.MessageEmbed();
            embed.addField('Role already assigned', `${user.user.username} already has this role !`);
            message.channel.send(embed);
            return;
        }
        else 
            user.roles.add(roleToAdd);

        embed = new Discord.MessageEmbed();
        embed.addField('Role has been assigned', `${user.user.username} is now ${roleToAdd.name} !`);
        message.channel.send(embed);
    }
}