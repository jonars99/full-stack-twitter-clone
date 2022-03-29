import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  },
  error: function (request, errorMessage) {
    console.log(request, errorMessage);
  }
});

//____________________USER & SESSIONS__________________

//___________________Create a User_____________________

export var createUser = function (username, email, password, callback) {
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
      callback(response);
    }
  };
  $.ajax(request);
};

//___________Create a Session (User Sign in)_____________

export var logInUser = function (username, password, callback) {
  var request = {
    type: 'POST',
    url: 'api/sessions',
    data: {
      user: {
        username: username,
        password: password
      }
    },
    success: function (response) {
      callback(response);
    }
  };
  $.ajax(request);
};

//__________________TWEETS______________________


//________________Get Tweets____________________

export var getTweets = function (callback) {
  var request = {
    type: 'GET',
    url: 'api/tweets',
    success: function (response) {
      callback(response);
    }
  };
  $.ajax(request);
};

//_______________Post a Tweet___________________

export var postTweet = function (content, callback) {
  var request = {
    type: 'POST',
    url: 'api/tweets',
    data: {
      tweet: {
        message: content
      }
    },
    success: function (response) {
      callback(response);
    }
  };
  $.ajax(request);
};

//_______________Delete a Tweet__________________

export var deleteTweet = function (id, callback) {
  var request = {
    type: 'DELETE',
    url: 'api/tweets/' + id,
    success: function () {
      callback();
    }
  };
  $.ajax(request);
};