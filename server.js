var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var _ = require('underscore');


//=============================START GET CALL======================//


//[[[[[[[[[[[[[BUTTON]]]]]]]]]]]]]//
app.get('/scrape', function (req, res){
   url = 'http://www.laxpower.com/update15/binboy/rating36.php';

    request(url, function(error, response, html){
//==========BEG. OF 'IF STATEMENT'=====================//
        if(!error){

            var $ = cheerio.load(html);


            var teams, team, rank, rating;
            var michTeams = { teams : ""};

            //Constructor?
            var oneTeam = { team : "", rank : "", rating : ""};
            var allTeams  //=?See Mongo Relationships lab
            =[];

//*********************JQUERY**********************//
            $('#content_well > div.cs1 > left > dt > dl > div:nth-child(3) > div.cs1 > pre').map(function(){


                                          
            	var data = $(this);
                teams = data.text().split("\n");
                michTeams.teams = teams;

//-------------------SLICER----------------------//  

                // var WRITER = function ()
                for(i=13;i<teams.length;i++){
                teamFile = teams[i];
                var rankSplitter = teamFile.split('');
                //rank and rating indices should remain constant in the table

//------------------oneTeam-Object-Constructor-----------------//

                rank = rankSplitter[0]+rankSplitter[1]+rankSplitter[2];
                rating = rankSplitter[30]
                        +rankSplitter[31]
                        +rankSplitter[32]
                        +rankSplitter[33]
                        +rankSplitter[34];
                team = rankSplitter[4]
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

//need to iterate through until whitespace
//i can probably normalize whitespace via cheerio AT THIS POINT--after rank&rating
//rankSplitter[4]>>>>until whitespace

                oneTeam.team = team;
                oneTeam.rank = rank;
                oneTeam.rating = rating;


    //-------------oneTeam Object Created above---------//

                allTeams.push(oneTeam);
                console.log(oneTeam);
//=====<<<<<<<<<<<<<GOING TO NEED A POST METHOD HERE>>>>>======//

//Everytime a 'oneTeam' OBJECT is Created::>> 
                //POST as file in: MongoDB - Collection

            //MONGODBMONGODB=====mongodb========MONGODBMONGODB//

                    // require mongoose
                    // setup mongoDB Collections
                    //convert 'oneTeam' objects to "files" via :
                        //db.Collections
                    //RUN MONGOD server

           }//end of FOR LOOP-----------SLICER(end)----------------->>



            }//.map(function)
           )//***jQuery(end)
            res.json(allTeams);
        }//==========END OF 'IF STATEMENT'=====================//
    });//end of REQUEST


//---------------------------WRITER FILES (DOWN)---------------------//


// MongoDB???


//---------------------------WRITER FILES (UP)---------------------//
})//==============================END OF GET CALL==============//

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;