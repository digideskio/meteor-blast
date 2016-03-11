Template.chatHome.events({
  "submit .new-message": function(event) {
    // Stop the form from submitting
    event.preventDefault();
    // Grab the value at message
    var message = event.target.message.value;
    // Call the method to add a chat message
    Meteor.call('addChatMessage', message);
    // Clear the form
    event.target.message.value = "";
    // Auto scroll to the bottom of the page
    var selector = $('.chat-window');
    selector.scrollTop(selector[0].scrollHeight);
  }
});

// This is the preferred way to access the DOM if you
// need to do something after all the data has been rendered.
// Sadly, it is not working.
Template.chatHome.onRendered(function() {
  Tracker.afterFlush(function() {
    var selector = $('.chat-window');
      selector.scrollTop(selector[0].scrollHeight);
  });
});
