var width = window.innerWidth;
var height = window.innerHeight;
var whiteboard = document.getElementById('whiteboard');
// var socket = io(location.origin);
var socket = io('http://localhost:3000');

// Initialize Canvas
whiteboard.innerHTML = '<canvas id="canvas" width="' + width*0.6 + '" height="' + height + '"></canvas>';
whiteboard.innerHTML += '<button id="erase">ERASE ALL</button>';

socket.on('draw', function(data) {
	draw(data.x, data.y, data.type);
})

$("#channel").keypress(function(e){ 
	var prevChannel = channel;
	if (e.which == 13) {
		channel = this.innerHTML;
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