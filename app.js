var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/dist'));

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
	socket.on('drawClick', function(data) {
		socket.broadcast.emit('draw', { x : data.x, y : data.y, type: data.type });
	})
})

http.listen(3000, function() {
	console.log('listening on  port 3000');
})