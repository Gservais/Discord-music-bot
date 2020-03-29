const Discord = require("discord.js");
const unirest = require("unirest");
const { horoscope_api_token } = require('../config');

module.exports = {
    name:'horoscope',
    description:'Gives the daily horoscope for a specific sign',
    args:['sign'],
    async execute(message, args){
        const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
    
        if(args.length === 0){
            embed = new Discord.MessageEmbed();
            embed.addField('Missing argument', 'Please specify your sign!');
            embed.addField('Command template', '<prefix>horoscope <sign>');
            embed.addField('Sign values', 'aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius and pisces');
            message.channel.send(embed);
            return;
        }
    
        if(!signs.includes(args[0])){
            embed = new Discord.MessageEmbed();
            embed.addField('Wrong argument', 'Please specify a correct sign');
            embed.addField('Sign values', 'aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius and pisces');
            message.channel.send(embed);
            return;
        }
    
        unirest
            .post("https://sameer-kumar-aztro-v1.p.rapidapi.com/")
            .query({
                "sign": args[0],
                "day": "today"
            })
            .headers({
                "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
                "x-rapidapi-key": horoscope_api_token,
                "content-type": "application/x-www-form-urlencoded"
            })
            .form({})
            .end(function (res) {
                if (res.error) throw new Error(res.error);
                
                embed = new Discord.MessageEmbed();
                embed.addField('Your daily horoscope', `\:${args[0]}: ${res.body.description}`);
                message.channel.send(embed);
            })
    }
}