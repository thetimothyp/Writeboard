var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var mouseDown = 0,
	prevX = 0,
	prevY = 0,
	currX = 0,
	currY = 0;

canvas.onmousemove = function(e) {
	if(!mouseDown) {
		currX = e.clientX - canvas.offsetLeft;
		currY = e.clientY - canvas.offsetTop;
	}
	move(e);
};

canvas.onmousedown = function(e) {
	mouseDown = 1;
}

canvas.onmouseup = function(e) {
	mouseDown = 0;
}

erase.onclick = function(e) {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function move(e) {
	if (mouseDown) {
		prevX = currX;
		prevY = currY;
		currX = e.clientX - canvas.offsetLeft;
		currY = e.clientY - canvas.offsetTop;
		draw();
	}
}

function draw() {
	context.beginPath();
	context.moveTo(prevX, prevY);
	context.lineTo(currX, currY);
	context.strokeStyle = '#000000';
	context.lineWidth = 5;
	context.lineCap = 'round';
	context.stroke();
	context.closePath();
}

// function draw(x, y, type) {
// 	if (type == 'dragstart') {
// 		context.beginPath();
// 		context.moveTo(x, y);
// 	} else if (type == 'drag') {
// 		context.lineTo(x, y); 
// 		context.stroke();
// 	} else {
// 		context.closePath();
// 	}
// }

// $('canvas').on


