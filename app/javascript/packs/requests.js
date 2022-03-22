import $ from 'jquery';

var createUser = function (username, email, password) {
  var request = {
    type: 'POST',
    url: 'api/users',
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    },
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

createUser('testuser2', 'user2@test.com', 'testpassword2');