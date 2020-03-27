const {kassId} = require('../config')

module.exports={
    name:'teuteu',
    description: 'Transform the given sentence into a teuteu sentence',
    execute(message, args){
        if(args.length === 0){
            embed = new Discord.MessageEmbed();
            embed.addField('Wrong args', 'Please give a sentence to teuteu!');
            embed.addField('Command template', '<prefix>teuteu <teuteu>');
            message.channel.send(embed);
            return;
        }

        if(message.author.id === kassId)
            message.channel.send('Tg kass');

        const sentence = args.join(' ');

        let gnegneSentence = "";
        for(let i = 0; i < sentence.length; i++){
            gnegneSentence += Math.random() >= 0.5 ? sentence[i].toUpperCase() : sentence[i];
        }
        
        message.channel.send(gnegneSentence);
    }
}