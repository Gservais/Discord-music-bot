const Discord = require("discord.js");
const Canvas = require('canvas');

module.exports = {
    name: 'Avatar',
    description:  "Displays your own avatar or the mentionned user's avatar",
    
    async execute(message, args){
        const user = message.mentions.users.first() ? message.mentions.users.first() : message.author;
        const userAvatar = user.displayAvatarURL({ format: 'png' });
    
        const canvas = Canvas.createCanvas(200, 200);
        const ctx = canvas.getContext('2d');
    
        const avatar = await Canvas.loadImage(userAvatar);
        ctx.drawImage(avatar,0,0, canvas.width, canvas.height);
    
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'avatar.png ');
        message.channel.send(`${user.username}'s avatar`,attachment)
    }
}