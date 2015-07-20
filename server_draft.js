var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


app.get('/scrape', function (req, res){

  //All the web scraping magic will happen here
   url = 'http://www.laxpower.com/update15/binboy/rating36.php';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);


            var team, rank, rating;
            var json = { team : "", rank : "", rating : ""};

            $('#content_well > div.cs1 > left > dt > dl > div:nth-child(3) > div.cs1 > pre > a:nth-child(7)').filter(function(){

                var data = $(this);
                team = data.text();
                rank = 1;
                rating = 99;

//-------------------SLICER----------------------//               


                json.team = team;
                json.rank = rank;
                json.rating = rating;
            })
            }
                console.log(json);
                // res.json(json);

fs.writeFile('rankings.json', JSON.stringify(json, null, 4), function(err) {
        console.log('File successfully written! - Check your project directory for the rankings.json file');
        })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!');
    })
});

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;