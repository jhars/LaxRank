var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var _ = require('underscore');


app.get('/scrape', function (req, res){
   url = 'http://www.laxpower.com/update15/binboy/rating36.php';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters:
    // error, response status code, html

    request(url, function(error, response, html){

        if(!error){

            var $ = cheerio.load(html);


            var teams, team, rank, rating;
            var michTeams = { teams : ""};
            var oneTeam = { team : "", rank : "", rating : ""};

            $('#content_well > div.cs1 > left > dt > dl > div:nth-child(3) > div.cs1 > pre').map(function(){
//-------------------SLICER----------------------//    
            	var data = $(this);
                teams = data.text().split("\n");
                michTeams.teams = teams;

                teamFile = teams[13];
                var rankSplitter = teamFile.split('');
                //rank and rating indices should remain constant in the table
                rank = rankSplitter[2];
                rating = rankSplitter[30]+rankSplitter[31]+rankSplitter[32]+rankSplitter[33]+rankSplitter[34];

                //need to iterate through until whitespace
                //i can probably normalize whitespace via cheerio AT THIS POINT--after rank&rating
                //rankSplitter[4]>>>>until whitespace
                team = rankSplitter[4]+rankSplitter[5]+rankSplitter[6]+rankSplitter[7]+rankSplitter[8]+rankSplitter[9]+rankSplitter[10]+rankSplitter[11]+rankSplitter[12]+rankSplitter[13]+rankSplitter[14]+rankSplitter[15];

                oneTeam.team = team;
                oneTeam.rank = rank;
                oneTeam.rating = rating;

            })
            }
            	console.log(michTeams);
            	console.log(oneTeam);
            	// res.json(json);

fs.writeFile('rankings.json', JSON.stringify(michTeams, null, 4), function(err) {
		console.log('File successfully written! - Check your project directory for the rankings.json file');
        })
fs.writeFile('individual_team.json', JSON.stringify(oneTeam, null, 4), function(err) {
		console.log('File successfully written! - Check your project directory for the individual_team.json file');
        })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!');
    })
});

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;