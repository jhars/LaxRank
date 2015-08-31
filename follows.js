$(function() {

  // `logsController` holds log functionality
  var followsController = {
    
    // compile underscore template
    template: _.template($('#follow-template').html()),

    // get all logs
    all: function() {
      // AJAX call to server to GET /api/logs
      $.get('/api/follows', function(allfollows) {
        console.log(allFollows);
        
        // iterate through all logs
        _.each(allFollows, function(follow, index) {
          console.log(follow);
          
          // pass log through underscore template
          var $followHtml = $(followsController.template(follow));
          console.log($followHtml);
          
          // append log HTML to page
          $('#follow-list').append($followHtml);
        });
      });
    },

    // create new log
    create: function(followData) {
      // define object with our log data
      var followData = {laxteams: teamData};
      
      // AJAX call to server to POST /api/logs
      $.post('/api/follows', followData, function(newFollow) {
        console.log(newFollow);
        
        // pass log through underscore template
        var $followHtml = $(followsController.template(newFollow));
        console.log($followHtml);

        // append log HTML to page
        $('#follow-list').append($followHtml);
      });
    },

    setupView: function() {
      // get all existing logs and render to page
      followsController.all();

      // add submit event on new log form
      $('#new-follow').on('submit', function(event) {
        event.preventDefault();
        
        // grab log type and calories from form
        var followLaxTeam = $('#lax-teams').val();
        // create new log
        followsController.create(followLaxTeam);

        // reset the form
        $(this)[0].reset();
      });
    }
  };

  followsController.setupView();

});