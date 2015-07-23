  var gameController= { 
 
    teamTemplate: _.template($('#comment-template').html()),
    

//setup render function to push data to template
  render: function (data) {
    var $cHtml = $(gameController.cTemplate(data));
    $('#comment-list').prepend($cHtml);
  },

//setup view on home page
  all: function (user, status) {
    $.ajax ({
      type: 'GET',
      url: '/api/comment',
      data: {
        user: user, 
        status: status
      },
      success: function (data) {
        var allComment = data;
        _.each(allComment, function(comment) {
          // pass each phrase object through template and append to view
          gameController.render(comment);
        });
        gameController.addEventHandlers();
      }
    })
    console.log("refreshed")
  },

      setupView: function() {
        //sppend existing Comment to view
        gameController.all();
        $('#new-comment').on('submit', function (event) {
          event.preventDefault();
          var commentText = $('#comment-text').val();
          gameController.save(commentText);

          $(this)[0].reset();
        });
      },
    


  }; //end gameController
  gameController.setupView();

