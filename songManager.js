const ytdl = require('ytdl-core');
const Discord = require("discord.js");
const streamSettings = {volume: 0.15};

var queues = new Map();

const test = (server)=>{
    var q = queues.get(server);
    if(!q){
        q = {
            songs : new Array(),
            addSong : (song)=>{
                q.songs.push(song);
            },
            skipSong : ()=>{
                q.songs.shift();
            },
            clear : ()=>{
                q.songs = new Array();
            },
            nextSong : ()=>{
                return q.songs[0];
            }
        }
        queues.set(server, q);
    }
    return queues.get(server);
}


var queue = null;
var dispatcher = null;
var channel = null;
var connection = null;

const playSong = (nextSong, message)=>{
    setDispatcher(connection.play(ytdl(nextSong.url, {filter:'audioonly'}), streamSettings));
    embed = new Discord.MessageEmbed();
    embed.addField("\:musical_note:  Information", `Now playing : ${nextSong.title}`);
    message.channel.send(embed);
}

const defineDispatcher = (message)=>{
    getDispatcher().on('finish',()=>{
        queue.skipSong();
        const nextSong = queue.nextSong();
        if(nextSong){
            playSong(nextSong, message)
            defineDispatcher(message);
        }    
        else{
            disconnect();
        }
    });

    getDispatcher().on('error', (err)=>{
        console.log(err)
    })
}

const getQueue = ()=>{
    if(!queue)
        queue = {
            songs : new Array(),
            addSong : (song)=>{
                queue.songs.push(song);
            },
            skipSong : ()=>{
                queue.songs.shift();
            },
            clear : ()=>{
                queue.songs = new Array();
            },
            nextSong : ()=>{
                return queue.songs[0];
            }
        }

    return queue;
}

const disconnect = ()=>{
    getChannel().leave();
    setChannel(null);
    setConnection(null);
    setDispatcher(null);
}

const setDispatcher = (dis)=>dispatcher = dis;

const getDispatcher = ()=>dispatcher;

const setChannel = (chan)=>channel = chan;

const getChannel = ()=>channel;

const setConnection = (con)=>connection = con;

const getConnection = ()=>connection;

module.exports={
    getQueue,
    setDispatcher,
    getDispatcher,
    setChannel,
    getChannel,
    setConnection,
    getConnection,
    playSong,
    defineDispatcher,
    disconnect
}