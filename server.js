var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var _ = require('underscore');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


//=============================START GET CALL======================//
var allTeams  =[];
//[[[[[[[[[[[[[BUTTON]]]]]]]]]]]]]//
app.get('/scrape', function (req, res){
   url = 'http://www.laxpower.com/update15/binboy/rating36.php';
   
    request(url, function(error, response, html){
//==========BEG. OF 'IF STATEMENT'=====================//

        if(!error){
            var $ = cheerio.load(html);
            var teams, team, rank, rating;
            var michTeams = { teams : ""};
            // var oneTeam = { team : "", rank : "", rating : ""};
            // var allTeams  =[];//=?See Mongo Relationships lab

//*********************JQUERY**********************//
            $('#content_well > div.cs1 > left > dt > dl > div:nth-child(3) > div.cs1 > pre').map(function(){


                                          
                var data = $(this);
                teams = data.text().split("\n");
                michTeams.teams = teams;

//-------------------SLICER----------------------//  
                for(i=13;i<teams.length;i++){
                teamFile = teams[i];
                var rankSplitter = teamFile.split('');
                var oneTeam = { team : "", rank : "", rating : ""};
                rank = rankSplitter[0]+rankSplitter[1]+rankSplitter[2];

                rating= rankSplitter[30]
                        +rankSplitter[31]
                        +rankSplitter[32]
                        +rankSplitter[33]
                        +rankSplitter[34];

                team =  rankSplitter[4]
                        +rankSplitter[5]
                        +rankSplitter[6]
                        +rankSplitter[7]
                        +rankSplitter[8]
                        +rankSplitter[9]
                        +rankSplitter[10]
                        +rankSplitter[11]
                        +rankSplitter[12]
                        +rankSplitter[13]
                        +rankSplitter[14]
                        +rankSplitter[15];

                oneTeam.team = team;
                oneTeam.rank = rank;
                oneTeam.rating = rating;

                allTeams.push(oneTeam);
                console.log(oneTeam);

           }//end of FOR LOOP-----------SLICER(end)----------------->>
            }//.map(function)
           )//***jQuery(end)
            res.json(allTeams);

        }//==========END OF 'IF STATEMENT'=====================//
    });//end of REQUEST
})//==============================END OF GET CALL==============//

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;