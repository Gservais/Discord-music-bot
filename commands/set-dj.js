const Discord = require("discord.js");
const songManager = require('../manager').getSongManager()

module.exports = {
    name:'set-dj',
    description:'Set the DJ role',
    args:['dj  role'],
    execute(message,args){
        if(args[0] === undefined){
            embed = new Discord.MessageEmbed();
            embed.addField('Missing role', 'Please mention the missing role!');
            embed.addField('Command template', '<prefix>set-dj <role>');
            message.channel.send(embed);
            return;
        }

        const serverId = message.guild.id;
        const roleToSet = message.guild.roles.cache.find(role => role.name === args.slice(1, args.length).join(" "));

        if(user === undefined){
            embed = new Discord.MessageEmbed();
            embed.addField('Unknown user', 'Please mention a known user !');
            message.channel.send(embed);
            return;
        }

        if(roleToSet === undefined){
            embed = new Discord.MessageEmbed();
            embed.addField('Unknown', 'Please mention a known role !');
            message.channel.send(embed);
            return;
        }

        if(songManager.getRole(serverId) === roleToSet){
            embed = new Discord.MessageEmbed();
            embed.addField('Already set', 'This role is already set as dj role');
            message.channel.send(embed);
            return;
        }

        songManager.setRole(serverId, roleToSet);
        embed = new Discord.MessageEmbed();
        embed.addField('Role has been assigned', `${roleToAdd.name} has been set as DJ role!`);
        message.channel.send(embed);
    }
}