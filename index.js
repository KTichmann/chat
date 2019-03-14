const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3000;
const { SECRET } = process.env

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        jwt.verify(msg.auth, SECRET, (err, decoded) => {
            if(!err){
                console.log("username: ", decoded.username)
                console.log("message: ", msg.message)
                io.emit('chat message', {
                    username: decoded.username, 
                    message: msg.message
                })
            }
        })
    })
})

http.listen(PORT, function(){
    console.log('listening on *:3000');
})