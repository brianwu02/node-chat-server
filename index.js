var express = require('express');
var app = express();

var port = 8000;

app.get('/', function(req, res) {
    res.send("It works!");
});

// we pass the expressJS server to socket.io. in effect, 
// our real time communication will still happen on same port.
var io = require('socket.io').listen(app.listen(port));

console.log('listening on port: ' + port);

app.set('views', __dirname + '/template');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.get('/', function(req, res) {
    res.render("page");
});

app.use(express.static(__dirname + '/public'));


// portion of code that will recieve a message from 
// the client and send it to all the others. 
// Every socket.io application begins with a 
// 'connection' handler

io.sockets.on('connection', function(socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function(data) {
        io.sockets.emit('message', data);
    });
});

