var express = require('express');
var app = express();
var port = 8000;

// we pass the expressJS server to socket.io. in effect, 
// our real time communication will still happen on same port.
var io = require('socket.io').listen(app.listen(port));
/* log levels:
 *  0 - error
 *  1 - warn
 *  2 - info
 *  3 - debug
 */
io.set('log level', 2);

console.log('listening on port: ' + port);

app.set('views', __dirname + '/template');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.get('/', function(req, res) {
    res.render("page");
});

app.get('/', function(req, res) {
    res.send("It works!");
});


app.use(express.static(__dirname + '/public'));

/*
portion of code that will recieve a message from  the client and send it to all the others. 
Every socket.io application begins with a  'connection' handler.

the object 'socket' is passed to the handler is the socket of the client.

*/

io.sockets.on('connection', function(socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function(data) {
        io.sockets.emit('message', data);
    });
});

