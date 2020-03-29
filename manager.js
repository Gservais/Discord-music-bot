const ytdl = require('ytdl-core');
const Discord = require("discord.js");
const streamSettings = {volume: 0.15};

class SongManager{
    constructor(){
        this.queues = new Map();
        this.dispatchers = new Map();
        this.channels = new Map();
        this.connections = new Map();
        this.roles = new Map();
    }

    disconnect(server){
        this.getChannel(server).leave();
        this.setChannel(server, null);
        this.setConnection(server, null);
        this.setDispatcher(server, null);
        this.getQueue(server).songs = new Array();
    }

    getQueue(server){
        var q = this.queues.get(server);
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
            this.setQueue(server, q);
        }
        return this.queues.get(server);
    }

    getDispatcher(server){
        return this.dispatchers.get(server)
    }

    getChannel(server){
        return this.channels.get(server)
    }

    getConnection(server){
        return this.connections.get(server)
    }

    getRole(server){
        return this.roles.get(server);
    }

    setQueue(server, queue){
        this.queues.set(server, queue);
    }

    setDispatcher(server, dispatcher){
        this.dispatchers.set(server, dispatcher);
    }

    setChannel(server, channel){
        this.channels.set(server, channel);
    }

    setConnection(server, connection){
        this.connections.set(server, connection);
    }
    
    setRole(server, role){
        this.roles.set(server, role);
    }

    playSong(server, nextSong, message){
        this.setDispatcher(server, this.getConnection(server).play(ytdl(nextSong.url, {filter:'audioonly'}), streamSettings));
        const embed = new Discord.MessageEmbed();
        embed.addField("\:musical_note:  Information", `Now playing : ${nextSong.title}`);
        message.channel.send(embed);
    }

    defineDispatcher(server, message){
        this.getDispatcher(server).on('finish',()=>{
            this.getQueue(server).skipSong();
            const nextSong = this.getQueue(server).nextSong();
            if(nextSong){
                this.playSong(nextSong, message)
                this.defineDispatcher(server, message);
            }    
            else{
                this.disconnect(server);
            }
        });
    
        this.getDispatcher(server).on('error', (err)=>{
            console.log(err)
        })
    }
}

let songManager;

module.exports={
    getSongManager(){
        if(!songManager)
            songManager = new SongManager();
        return songManager;
    }
}