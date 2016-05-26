var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
	res.sendFile('/index.html');
})

io.on('connection', function(socket) {
	console.log('user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	})
	socket.on('chat', function(msg) {
		io.emit('chat', msg);
	})
})

http.listen(3000, function() {
	console.log('listening on  port 3000');
})