var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var router = require('socketio-wildcard')();
io.use(router);
var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@ds013908.mlab.com:13908/writeboard-app');

// var Channel = require('./schema.js');
// var all = new Channel({
// 	name: 'all',
// 	messages: []
// });

// all.save(function(err) {
// 	console.log('all channel saved');
// })



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
	socket.on('drawClick', function(data) {
		socket.broadcast.emit('draw', { x : data.x, y : data.y, type: data.type });
	})

})

http.listen(process.env.PORT || 3000, function() {
	console.log('listening on  port ' + process.env.PORT);
})



