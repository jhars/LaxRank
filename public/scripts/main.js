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

        // pass current user through template for nav links
        $navHtml = $(mainController.userTemplate({currentUser: user}));

        // append HTML to page
        $('#user-greet').append($navHtml);
      });
    }
  };

  mainController.showCurrentUser();

});