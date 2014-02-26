var express = require('express');
var app = express();

var port = 8000;

app.get('/', function(req, res) {
    res.send("It works!");
});

app.listen(port);
console.log('listening on port: ' + port);

app.set('views', __dirname + '/template');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.get('/', function(req, res) {
    res.render("page");
});


