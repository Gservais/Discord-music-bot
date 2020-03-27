const { prefix, adminRoleId } = require('../config');


module.exports = (client, message)=>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if(!command) return;

    const isAuthorized = message.member.roles.cache.get(adminRoleId);

    if(command.adminOnly && !isAuthorized){
        const embed = new Discord.MessageEmbed()
            .addField('Unauthorized', 'You must be an admin !');
        message.channel.send(embed);
    }

    command.execute(message, args);
}