var width = window.innerWidth;
var height = window.innerHeight;
var whiteboard = document.getElementById('whiteboard');
var socket = io(location.origin);

whiteboard.innerHTML = '<canvas id="canvas" width="' + width*0.6 + '" height="' + height + '"></canvas>';
whiteboard.innerHTML += '<button id="erase">ERASE ALL</button>';

var message = document.getElementById('message');
document.getElementById('chat').onsubmit = function(e) {
	if (message.value.length > 0) {
		socket.emit('chat', message.value);
		message.value = '';
	}
	return false;
}
socket.on('chat', function(msg) {
	$('#messages').append($('<li>').text(msg));
	$('#messages').scrollTop($('#messages')[0].scrollHeight);
});
socket.on('draw', function(data) {
	draw(data.x, data.y, data.type);
})

$("#channel").keypress(function(e){ 
	if (e.which == 13) {
		blurAll();
	}
	return e.which != 13; 
});

function blurAll(){
 var tmp = document.createElement("input");
 document.body.appendChild(tmp);
 tmp.focus();
 document.body.removeChild(tmp);
}