module.exports = (client)=>{
    console.log('Client connected');
    client.user.setActivity('Nooting', { type:'PLAYING' })
}