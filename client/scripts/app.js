// YOUR CODE HERE:

var app = {
  friendsList: {}
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
      console.log('chatterbox: Message sent');
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
    url: undefined,
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
app.clearMessages = function() {
  $('#chats').empty();
};
app.renderMessage = function(message) {
  $('#chats').append('<div></div>');
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
app.handleUsernameClick = function() {
  // make an object to store usernames
  // add usernames to this object and set the value to true
  // var username = this.username;
  // $('.username').click(function(username) {
  //   $('.friend').append('<div></div>');
  // });

  app.friendsList[username] = true;
};
app.renderRoom = function() {
  $('#roomSelect').append('<div></div>');
};


$(document).ready(function() {
  //app.init = function () {};
  // app.send = function () {};
  // $.ajax({
  //   // This is the url you should use to communicate with the parse API server.
  //   url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
  //   type: 'POST',
  //   data: JSON.stringify(message),
  //   contentType: 'application/json',
  //   success: function (data) {
  //     console.log('chatterbox: Message sent');
  //   },
  //   error: function (data) {
  //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //     console.error('chatterbox: Failed to send message', data);
  //   }
  // });

});