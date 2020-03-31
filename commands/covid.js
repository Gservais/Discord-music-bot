const Discord = require("discord.js");
const URL = 'https://covid19.mathdro.id/api';
const unirest = require("unirest");

module.exports = {
    name: 'covid',
    description:  "Displays specifif information about covid",
    args:['all (optional)','country'],
    async execute(message, args){
        const scope = args[0];

        if(!scope){
            if(args.length === 0){
                embed = new Discord.MessageEmbed();
                embed.addField('Missing argument', 'Please specify the information scope!');
                embed.addField('Command template', '<prefix>covid <all | country>');
                message.channel.send(embed);
                return;
            }
        }

        const urlToCall = scope !== 'all' ? `${URL}/countries/${scope}` : URL;

        unirest
            .get(urlToCall)
            .end(res=>{
                if(res.error && res.code === 404){
                    embed = new Discord.MessageEmbed();
                    embed.addField('Unknown country', 'Please specify a known country !');
                    message.channel.send(embed);
                    return;
                }

                const data = res.body;

                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Covid evolution in ${scope === 'all' ? 'The world' : scope}`)
                    .setDescription('\n')
                    .addFields(
                        { name: 'Cases', value: data.confirmed.value, inline: true },
                        { name: 'Deaths', value: data.deaths.value, inline: true },
                        { name: 'Recovered', value: data.recovered.value, inline: true },
                    );

                message.channel.send(exampleEmbed);
            })
    }
}