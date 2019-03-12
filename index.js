const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const jwt = require('jsonwebtoken');

const SECRET = 'forumapiisawesome'


io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        jwt.verify(msg.auth, SECRET, (err, decoded) => {
            if(!err){
                io.emit('chat message', {
                    username: decoded.username, 
                    message: msg.message
                })
            }
        })
    })
})

http.listen(3000, function(){
    console.log('listening on *:3000');
})