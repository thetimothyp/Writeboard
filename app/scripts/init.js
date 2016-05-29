var width = window.innerWidth;
var height = window.innerHeight;
var whiteboard = document.getElementById('whiteboard');
var socket = io(location.origin);
// var socket = io('http://localhost:3000');
socket.emit('join', 'all');

// Initialize Canvas
whiteboard.innerHTML = '<canvas id="canvas" width="' + width*0.6 + '" height="' + height + '"></canvas>';
whiteboard.innerHTML += '<button id="erase">ERASE ALL</button>';

socket.on('draw', function(data) {
	draw(data.x, data.y, data.type);
})