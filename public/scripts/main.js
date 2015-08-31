$(function() {

  // `mainController` holds shared site functionality
  var mainController = {

    // compile underscore template for nav links
    userTemplate: _.template($('#user-template').html()),

    // get current (logged-in) user
    showCurrentUser: function() {
      ///////////////////////////////////
      // AJAX call to SERVER to GET /api/users/current
      //////////////////////////////////
      $.get('/api/users/current', function(user) {
        console.log(user);

//setup view on home page
    all: function () {
      $.ajax ({
        type: 'GET',
        url: '/api/teams',
        success: function (data) {
          var allTeams = data;
          console.log(allTeams);
          _.each(allTeams, function(teamObj) {
            if(teamObj.natRank){
            teamController.render(teamObj);
          }
          });
          // teamController.addEventHandlers();
        }
      })
      console.log("refreshed")
    },
        // pass current user through template for nav links
        // $navHtml = $(mainController.userTemplate({currentUser: user}));

        // append HTML to page
        $('#user-greet').append($navHtml);
      });
    }
  };

  mainController.showCurrentUser();

});