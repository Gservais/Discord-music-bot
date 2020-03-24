const deleteMessage = require('./deleteMessage');
const addRole = require('./addRole');
const removeRole = require('./removeRole');
const kick = require('./kick');
const playSong = require('./playSong');
const pauseSong = require('./pauseSong');
const resumeSong = require('./resumeSong');
const stopSong = require('./stopSong');
const skipSong = require('./skipSong');

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
    deleteMessage,
    addRole,
    removeRole,
    kick,
    playSong,
    pauseSong,
    resumeSong,
    stopSong,
    skipSong
}