var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var _ = require('underscore');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var cors = require('cors');
var TeamPoster = require("./models/teamPoster");
// var MyTeams = require('./models/myTeamsPoster');
// var UserPoster = require('./models/userPoster');
// var session = require('express-session');

//------------Linking to Public Folder------//
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
// mongoose.connect('mongodb://localhost/laxdb');
//*********************FIX BELOW****************//
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/laxdb' // plug in the db name you've been using
);

//-------CORS BEERS--------//
// app.use(cors());
// var corsOptions = {
//   origin: 'https://laxrank.herokuapp.com/api/datapop'
// };
//----------------------ROUTES---------------------//

//=================AUTH ROUTES=====================//










// app.use(session({
//   saveUninitialized: true,
//   resave: true,
//   secret: 'SuperSecretCookie',
//   cookie: { maxAge: 60000 }
// }));

// // middleware to manage sessions
// app.use('/', function (req, res, next) {
//   // saves userId in session for logged-in user
//   req.login = function (user) {
//     req.session.userId = user.id;
//   };

//   // finds user currently logged in based on `session.userId`
//   req.currentUser = function (callback) {
//     UserPoster.findOne({_id: req.session.userId}, function (err, user) {
//       req.user = user;
//       callback(null, user);
//     });
//   };

//   // destroy `session.userId` to log out user
//   req.logout = function () {
//     req.session.userId = null;
//     req.user = null;
//   };

//   next();
// });

// STATIC ROUTES

// My Teams PAGE (MyTeams)
// app.get('/myteams', function (req, res) {
//   // check for current (logged-in) user
//   req.currentUser(function (err, user) {
//     // show profile if logged-in user
//     if (user) {
//       res.sendFile(__dirname + '/public/views/myteams.html');
//     // redirect if no user logged in
//     } else {
//       res.redirect('/');
//     }
//   });
// });

// // AUTH ROUTES (SIGN UP, LOG IN, LOG OUT)

// // create new user with secure password
// app.post('/users', function (req, res) {
//   var newUser = req.body.user;
//   UserPoster.createSecure(newUser, function (err, user) {
//     // log in user immediately when created
//     req.login(user);
//     res.redirect('/myteams');
//   });
// });

// // authenticate user and set session
// app.post('/login', function (req, res) {
//   var userData = req.body.user;
//   UserPoster.authenticate(userData.email, userData.password, function (err, user) {
//     req.login(user);
//     res.redirect('/myteams');
//   });
// });

// // log out user (destroy session)
// app.get('/logout', function (req, res) {
//   req.logout();
//   res.redirect('/');
// });

// // API ROUTES

// // show current user
// app.get('/api/users/current', function (req, res) {
//   // check for current (logged-in) user
//   req.currentUser(function (err, user) {
//     res.json(user);
//   });
// });

// // create new log for current user
// app.post('/api/users/current/myteams', function (req, res) {
//   // create new log with form data (`req.body`)
//   var newMyTeams = new MyTeams({
//     laxteams: req.body.laxteams
//   });

//   // save new log
//   newMyTeams.save();

//   // find current user
//   req.currentUser(function (err, user) {
//     // embed new log in user's logs
//     user.myTeams.push(newMyTeams);
//     // save user (and new log)
//     user.save();
//     // respond with new log
//     res.json(newMyTeams);
//   });
// });

// // show all logs
// app.get('/api/myteams', function (req, res) {
//   MyTeams.find(function (err, myTeams) {
//     res.json(myTeams);
//   });
// });

// // create new log
// app.post('/api/myteams', function (req, res) {
//   // create new log with form data (`req.body`)
//   var newMyTeams = new MyTeams({
//     laxteams: req.body.laxteams
//   });

//   // save new log
//   newMyTeams.save(function (err, savedMyTeams) {
//     res.json(savedMyTeams);
//   });
// });









//=================AUTH ROUTES=====================//

app.get('/national', function (req, res){
    var national = __dirname + "/public/views/national.html";
    res.sendFile(national);

});
//------------------DATA/API Objects-------------------//
var allTeams  =[];
var allURL = [];

//-----------------ROOT Route---------------------//
app.get('/', function (req, res){
  var index = __dirname + "/public/views/index.html";
  res.sendFile(index);
});

app.get('/api/teams', function (req, res){
  TeamPoster.find(function (err, foundTeams){
    res.json(foundTeams);
  })
})



//++++++++DO NOT GO TO THIS ROUTE++++++++++++//


//=============================START GET CALL======================//
                    //[[[[[[[[[[[[[BUTTON]]]]]]]]]]]]]//
app.get('/api/datapop', function (req, res){
   url = 'http://www.laxpower.com/update15/binboy/natlccr.php';
   
    request(url, function(error, response, html){
//==========BEG. OF 'IF STATEMENT'=====================//
        if(!error){
            var $ = cheerio.load(html);
            var teams, teamName, natRank, rating, teamLinks;//record
            var natTeams = { teams : ""};
$('#content_well > div.cs1 > left > dt > dl > div.cs1 > pre > a').filter(function(){
        var data = $(this);
        linker = data.attr(); //{href: "XHASPA.PHP"}
        allURL.push(linker.href);
    })
//*********************JQUERY**********************//
            $('#content_well > div.cs1 > left > dt > dl > div.cs1 > pre').map(function(){                 
                var data = $(this);
                links = data.attr('a');
                teams = data.text().split("\n");
                natTeams.teams = teams;

//-------------------SLICER----------------------//  
                for(i=7;i<teams.length;i++){
                teamFile = teams[i];
                var rankSplitter = teamFile.split('');
                
                var oneTeam = { 
                teamName : "",
                state : "",
                natRank : "",
                record : "",
                powerRating : "",
                teamURL : ""}

                natRank =   rankSplitter[1]+rankSplitter[2]+
                            rankSplitter[3]+rankSplitter[4];

                teamName =  rankSplitter[6]+rankSplitter[7]
                            +rankSplitter[8]+rankSplitter[9]
                            +rankSplitter[10]+rankSplitter[11]
                            +rankSplitter[12]+rankSplitter[13]
                            +rankSplitter[14]+rankSplitter[15]
                            +rankSplitter[16]+rankSplitter[17]
                            +rankSplitter[18]+rankSplitter[19]
                            +rankSplitter[20]+rankSplitter[21]
                            +rankSplitter[22]+rankSplitter[23]
                            +rankSplitter[24]+rankSplitter[25];

                state =     rankSplitter[32]+rankSplitter[33];

                record =    rankSplitter[36]+rankSplitter[37]
                            +rankSplitter[38]+rankSplitter[39]
                            +rankSplitter[40]+rankSplitter[41]
                            +rankSplitter[42]+rankSplitter[43]
                            +rankSplitter[44]+rankSplitter[45];

                powerRating=rankSplitter[64]+rankSplitter[65]
                            +rankSplitter[66]+rankSplitter[67]
                            +rankSplitter[67];            


                oneTeam.natRank = natRank;            
                oneTeam.teamName = teamName;
                oneTeam.state = state;
                oneTeam.record = record;
                oneTeam.powerRating = powerRating;
                oneTeam.teamURL = allURL[i-5];

                console.log(allURL[i-5]);

                allTeams.push(oneTeam);

                var newTeam = new TeamPoster(oneTeam);
                newTeam.save();

                }//end of FOR LOOP-----------SLICER(end)----------------->>
            }//___________________________.map(function)
            )//___________________________***jQuery(end)
            res.json(allTeams);

            var haverford = allTeams[0];
            console.log(haverford);
        //=============END OF POST CALL ==================//
        }//=======END OF 'IF STATEMENT'=====================//
    });//_________End of REQUEST________________________
});//==============END OF GET CALL==============//

//-----------------------!TO-DO!---------------------//
// Dummy data
// Seed into mongoose (shcema) -- lives here, in server.js

















app.listen(process.env.PORT || 8081)
console.log('Magic happens on port 8081');
exports = module.exports = app;
