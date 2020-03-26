const Discord = require("discord.js");
const Canvas = require('canvas');

module.exports = async (message, args)=>{
    const user = message.mentions.users.first() ? message.mentions.users.first() : message.author;
    const userAvatar = user.displayAvatarURL({ format: 'png' });

    const canvas = Canvas.createCanvas(250, 250);
    const ctx = canvas.getContext('2d');

    const avatar = await Canvas.loadImage(userAvatar);
    ctx.drawImage(avatar,0,0, canvas.width, canvas.height);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
    message.channel.send(`${user.username}'s avatar`,attachment)
}