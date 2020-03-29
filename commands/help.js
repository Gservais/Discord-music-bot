const Discord = require("discord.js");

module.exports = {
    name:'help',
    description:'Help bot users',
    execute(message, args){
        const embed = new Discord.MessageEmbed();
        const data = new Array();

        if(!args[0]){
            message.client.commands.forEach(command=>{
                if(command.name !== 'help')
                data.push(`\`${command.name}\``);
            })
            message.channel.send('Use `help <command>` to get command detail');
            embed.setTitle('Available commands')
                .setDescription(data.join('\n'))
        }
        else{
            const command = message.client.commands.find(c => c.name === args[0]);
            if(!command){
                embed.addField('Unknown command', 'Please mention a known command!');
            }
            else{
                embed.setTitle(`${command.name} details`);
                embed.addField('Description', command.description);
                if(command.args){
                    command.args.forEach(a => data.push(`<${a}>`))
                    embed.addField('Argument(s)', data.join(' '))
                }
            }
        }
        
        message.channel.send(embed);
    }
}