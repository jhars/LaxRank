var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define log schema
var MyTeamsSchema = new Schema({
  laxteams: String
});

// create and export Log model
var MyTeams = mongoose.model('MyTeams', MyTeamsSchema);
module.exports = Follow;