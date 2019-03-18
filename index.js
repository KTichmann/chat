const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const { SECRET } = process.env

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', function (req, res) {
    if(req.query.auth){
        jwt.verify(req.query.auth, SECRET, (err, decoded) => {
            if(!err){
                res.render('index', {username: decoded.username});
            } else {
                res.json({success: false, message: "authentication not successful"})
            }
        })
    } else {
        res.json({success: false, message: "no auth key provided"})
    }
})

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', {
            username: msg.username, 
            message: msg.message
        })
    })
})


http.listen(PORT, function(){
    console.log(`running at port: ${PORT}`)
})