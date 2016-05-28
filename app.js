var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
	res.sendFile('/index.html');
})

io.on('connection', function(socket) {
	console.log('user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	})
	socket.on('chat:all', function(msg) {
		io.emit('chat:all', msg);
	})
	socket.on('drawClick:all', function(data) {
		socket.broadcast.emit('draw:all', { x : data.x, y : data.y, type: data.type });
	})
})

http.listen(process.env.PORT || 3000, function() {
	console.log('listening on  port ' + process.env.PORT);
})