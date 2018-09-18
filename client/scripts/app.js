// YOUR CODE HERE:

var app = {
  username: '',
  roomname: {},
  messages: []
};
app.init = function () {};
app.send = function (message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('Message sent successfully');
      setTimeout(function() { app.fetch(); }, 500);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
app.fetch = function(message) {
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
      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].username && data.results[i].text && data.results[i].roomname) {
          if (!app.roomname.hasOwnProperty(data.results[i].roomname)) {
            app.roomname[data.results[i].roomname] = data.results[i].roomname;
          }
          if (app.antiHack(data.results[i].text)) {
            $('#chats').append('<div class="chat">' + '<span class="username" data-user></span></div>' + data.results[i].username + ':' + ' ' + data.results[i].text);
          }
        }
      }
      for (var key in app.roomname) {
        $('#roomSelect').append('<option>' + app.roomname[key] + '</option>');
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
  $('#chats').append('<div class="chat">' + '<span class="username" data-user></span></div>' + message.username+':' + ' ' + message.text);

  //$('.username').append('<div></div>');
  // app.addFriend = function() {
  //   $('.username').append('<div></div>');
  // };
  // addFriend();
  // var storeMessage = message.username;
  // $('.username').click(function(storeMessage) {
  //   $('.friend').append('<div></div>');
  // });
};
app.renderRoom = function() {
  $('#roomSelect').append('<div></div>');
};
app.antiHack = function(text) {
  if (text.startsWith('<script>')) {
    return false;
  } else {
    return true;
  }
};


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

  var message = {
    username: 'A Concerned Citizen',
    text: '༼ つ ◕_◕ ༽つ RPT10 TAKE MY ENERGY TO FINISH THIS SPRINT ༼ つ ◕_◕ ༽つ',
    roomname: 'Lobby'
  };

  app.fetch();
  app.send(message);

});