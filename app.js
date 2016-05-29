var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@ds013908.mlab.com:13908/writeboard-app');

var Channel = require('./schema.js');

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res){
	res.sendFile('/index.html');
})

io.on('connection', function(socket) {
	var currentRoom = 'all';
	console.log('user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	})
	socket.on('join', function(room) {
		socket.join(room);
		currentRoom = room;
		Channel.find({ name: currentRoom }, function(err, channel) {
			if (channel[0]) {
				var history = channel[0].messages;
				for (var i = 0; i < history.length; ++i) {
					socket.emit('chat', history[i]);
				}
			}
		})
	})
	socket.on('leave', function(room) {
		socket.leave(room);
	})
	socket.on('chat', function(msg) {
		io.to(currentRoom).emit('chat', msg);
		Channel.findOneAndUpdate({ name: currentRoom }, { $push: { messages: msg }}, { upsert: true }, function(err) {
			if (err) console.log(err);
		});
	})
	socket.on('drawClick', function(data) {
		socket.broadcast.to(currentRoom).emit('draw', { x : data.x, y : data.y, type: data.type });
	})

})

http.listen(process.env.PORT || 3000, function() {
	console.log('listening on  port ' + process.env.PORT);
})



