require('dotenv').config();
const Discord = require('discord.js');

const ADMIN_ROLE_ID = process.env.ADMIN_ROLE_ID;

function commandAnswer(message, answer){
    message.channel.send(answer);
};

module.exports={
    commandAnswer,
}