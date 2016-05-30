var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var channelSchema = new Schema({
	name: String,
	messages: Array,
	imageData: String
});

var Channel = mongoose.model('Channels', channelSchema);

module.exports = Channel;