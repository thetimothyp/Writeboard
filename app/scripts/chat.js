var channel = 'all';
var message = document.getElementById('message');

// Emit inputted message to chat:{channel}
$('#chat').on('submit', function(e) {
	if (message.value.length > 0) {
		socket.emit('chat', message.value);
		message.value = '';
	}
	return false;
});

// Listen on chat:{channel}
socket.on('chat', function(msg) {
	$('#messages').append($('<li>').text(msg));
	$('#messages').scrollTop($('#messages')[0].scrollHeight);
});

// Change channel
// Unfocus channel input on Enter keypress
$("#channel").keypress(function(e){ 
	var prevChannel = channel;
	if (e.which == 13) {
		channel = this.innerHTML;
		blurAll();
	}
	return e.which != 13; 
});

// Unfocus all inputs
function blurAll(){
 var tmp = document.createElement("input");
 document.body.appendChild(tmp);
 tmp.focus();
 document.body.removeChild(tmp);
}