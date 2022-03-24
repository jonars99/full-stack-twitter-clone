import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

//                  Create a User                  

export var createUser = function (username, email, password) {
  var request = {
    type: 'POST',
    url: 'api/users',
    data: {
      user: {
        username: username,
        email: email,
        password: password
      }
    },
    success: function (response) {
      console.log(response);
    },
    error: function (request, error) {
      console.log(request, error);
    }
  }
  $.ajax(request);
};

//               Post Tweet

export var postTweet = function (content) {
  var request = {
    type: 'POST',
    url: 'api/tweets',
    data: {
      tweet: {
        message: content
      }
    },
    success: function(response) {
      console.log(response);
    },
    error: function (request, error) {
      console.log(request, error);
    }
  }
  $.ajax(request);
}