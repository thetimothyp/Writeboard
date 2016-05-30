var width = window.innerWidth;
var height = window.innerHeight;
var whiteboard = document.getElementById('whiteboard');
var username = prompt('Enter username');
while (username == null) {
	prompt('Enter username');
}
// var socket = io(location.origin);
var socket = io('http://localhost:3000');
socket.emit('join', {channel: 'all', user: username});

// Initialize Canvas
whiteboard.innerHTML = '<canvas id="canvas" width="' + width*0.6 + '" height="' + height + '"></canvas>';
whiteboard.innerHTML += '<button id="erase">ERASE ALL</button>';
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
	context.strokeStyle = '#000000';
	context.lineWidth = 5;
	context.lineCap = 'round';

socket.on('draw', function(data) {
	draw(data.x, data.y, data.type);
})
socket.on('imageData', function(imageData) {
	var img = new Image;
	img.onload = function(){
		context.drawImage(img,0,0);
	}
	img.src = imageData;
})