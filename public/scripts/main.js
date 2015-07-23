$(function() {//ending Syntax has been deleted
// var $menuNational = $('#menu-national');//search button
// var $nationalList = $('#national-list');
// template: _.template($('#team-template').html());


  console.log('loaded');
  var teamController= { 
 
    teamTemplate: _.template($('#team-template').html()),
    

//setup render function to push data to template
    render: function (data) {
      var $teamHtml = $(teamController.teamTemplate(data));
      $('#national-list').append($teamHtml);
    },

//setup view on home page
    all: function () {
      $.ajax ({
        type: 'GET',
        url: '/api/teams',
        success: function (data) {
          var allTeams = data;
          console.log(allTeams);
          _.each(allTeams, function(teamObj) {
            // pass each phrase object through template and append to view
            teamController.render(teamObj);
          });
          // teamController.addEventHandlers();
        }
      })
      console.log("refreshed")
    },

      setupView: function() {
        teamController.all();
      }
    


  }; //end gameController
  teamController.setupView();
});
