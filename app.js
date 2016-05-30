// Initializations
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://test:test@ds013908.mlab.com:13908/writeboard-app');

// Create Channel collection
var Channel = require('./schema.js');

// Set up application routing
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res){
	res.sendFile('/index.html');
})

// Listen for socket connections from clients
io.on('connection', function(socket) {
	var currentRoom = 'all';
	console.log('user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	})
	// On 'join' event, switch socket client to given room and emit chat 
	// history of that room to the client
	socket.on('join', function(data) {
		socket.join(data.channel);
		currentRoom = data.channel;
		Channel.find({ name: currentRoom }, function(err, channel) {
			if (channel[0]) {
				// Emit chat history to client
				var history = channel[0].messages;
				for (var i = 0; i < history.length; ++i) {
					socket.emit('chat', history[i]);
				}
				// Emit current state of canvas to client
				socket.emit('imageData', channel[0].imageData);
				// Tell everyone else that a new user has joined
				var announcement = data.user + ' has entered the channel.';
				socket.broadcast.to(currentRoom).emit('announcement', announcement);
			}
		})
	})
	socket.on('leave', function(data) {
		socket.broadcast.to(data.channel).emit('announcement', data.user + ' has left the channel.');
		socket.leave(data.channel);
	})
	// On receiving 'chat' from client, broadcast the message to the whole 
	// room and add the message to the database
	socket.on('chat', function(data) {
		io.to(currentRoom).emit('chat', data);
		Channel.findOneAndUpdate({ name: currentRoom }, { $push: { messages: { user: data.user, msg: data.msg, timestamp: data.timestamp } }}, { upsert: true }, function(err) {
			if (err) console.log(err);
		});
	})
	// Broadcast 'draw' command to all room participants
	socket.on('drawClick', function(data) {
		io.to(currentRoom).emit('draw', { x : data.x, y : data.y, type: data.type });
	})
	// Whenever imageData is received from a client, save it to DB
	// so new room occupants may see
	socket.on('imageData', function(data) {
		Channel.findOneAndUpdate({ name: currentRoom }, { imageData: data }, { upsert: true }, function(err) {
			if (err) console.log(err);
		});
	})

})

http.listen(process.env.PORT || 3000, function() {
	console.log('listening on  port ' + process.env.PORT);
})



