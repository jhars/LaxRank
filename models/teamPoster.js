var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TeamPosterSchema = new Schema({
	team : String,
	rank : String,
	rating : String
});

var TeamPoster = mongoose.model('TeamPoster', TeamPosterSchema);

module.exports = TeamPoster;