require('dotenv').config();
const Discord = require('discord.js');

const ADMIN_ROLE_ID = process.env.ADMIN_ROLE_ID;

function commandAnswer(message, answer){
    message.channel.send(answer);
};

function checkIfAdmin(message){
    let isAdmin = message.member._roles.includes(ADMIN_ROLE_ID);
    if(!isAdmin){
        embed = new Discord.MessageEmbed();
        embed.addField('Unauthorized', 'You must be an admin !')
        commandAnswer(message, embed);
    }
    return isAdmin;
}

module.exports={
    commandAnswer,
    checkIfAdmin,
}