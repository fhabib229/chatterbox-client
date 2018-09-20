// YOUR CODE HERE:

var app = {
  username: '',
  roomname: {},
  $message: $('#message').val(),
  messages: []
};

app.init = function () {
};

app.send = function (message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('Message sent successfully');
      // for (var i = 0; i < data.results.length; i++) {
      //   $('#chats').append('<div class="chat">' + '<span class="username" data-user></span></div>' + data.results[i].username + ':' + ' ' + data.results[i].text);
      // }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', JSON.stringify(data));
    }
  });
};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: {
      order: '-createdAt'
    },
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      // Need to figure out how to set the current room and fetch messages for that room
      // When the room is changed, the messages should change to be the messages that correspond to that room
      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].username && data.results[i].text && data.results[i].roomname) {
          if (!app.roomname.hasOwnProperty(data.results[i].roomname)) {
            app.username[data.results[i].username] = data.results[i].username;
            app.roomname[data.results[i].roomname] = data.results[i].roomname;
          }
          if (app.antiHack(data.results[i].text)) {
            $('#chats').append('<div class="chat">' + '<span class="username" data-user></span></div>' + data.results[i].username + ':' + ' ' + data.results[i].text);
          }
        }
      }
      for (var key in app.roomname) {
        // store all the new rooms
        //var rooms = {};
        $('#roomSelect').append('<option>' + app.roomname[key] + '</option>');
        //if the user has a roomname add roomname to options
        if (!app.roomname[key]) {
          $('#roomSelect').append('<option>' + key + '</option>');
        }
        // set room values to true for constant time lookup
        //rooms[roomname] = true;
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch messages', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(message) {
  //$('#chats').append('<div class="chat">' + '<span class="username" data-user></span></div>' + message.username+':' + ' ' + message.text);
  //iterate through roomnames
  console.log('Message: ' + JSON.stringify(message.roomname));
  console.log('App:' + JSON.stringify(app.rommname));
  for (var key in app.roomname) {
    if (app.roomname.hasOwnProperty(message.roomname)) {
      return true;
    } else if (message.roomname === app.roomname) {
      return true;
    } else {
      return false;
    }
  }
    // if the roomname doesnt exist or its the lobby
    // return true;
    // else if message.roomname is === to app.roomname
    //return true
    // else return false
    // only messages that return true get rendered

};

app.renderRoom = function() {
  $('#roomSelect').append('<div></div>');
};

app.antiHack = function(text) {
  if (text.startsWith('<script>') || text.includes('$') || text.includes('console.log')) {
    return false;
  } else {
    return true;
  }
};

// function for when someone changes rooms
app.changeRooms = function(event, message) {
  console.log('success');
  var checkRoom = $('#roomSelect').prop('chosenRoom');
  // if its the first option
  // create a new room
  if (checkRoom === 0) {
    var roomname = prompt('What room?');
    // if the roomname doesnt exist make the room
    if (roomname) {
      $('#roomSelect').val(roomname);
    }
  } else {
    // move to an existing room with that name
    roomname = $('#roomSelect').val();
  }

  app.renderMessage(message);
};
// When username is clicked, add as a friend
// Display all messages sent by friends in bold

$(document).ready(function() {
  app.handleUsernameClick = function() {
    // make an object to store usernames
    // add usernames to this object and set the value to true
    // var username = this.username;
    // $('.username').click(function(username) {
    //   $('.friend').append('<div></div>');
    // });

    //app.friendsList[username] = true;
    $('.username').click(function() {
      $('.friend').append('<div></div>');
    });
  };

  // var message = {
  //   username: 'It\'s WORKING',
  //   text: '<img src="images/takemyenergy.gif" height="400" width="400">',
  //   roomname: 'Lobby'
  // };

  app.init();
  app.fetch();
  var message = {
    username: window.location.search,
    text: app.message,
    roomname: 'lobby',
  };

  $('#add-message').on('click', function() {
    message.text = $('#message').val();
    console.log('Message' + JSON.stringify(message));
    app.send(message);
    setTimeout(function() { app.fetch(); }, 1000);
  });
  $('#roomSelect').on('change', (app.changeRooms(event, message)));
});