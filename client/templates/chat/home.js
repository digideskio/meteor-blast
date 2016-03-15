// Functions available to this template js file only
var scrollToBottom = function() {
  var selector = $('.chat-window');
  selector.scrollTop(selector[0].scrollHeight);
};

// Functions that are available in the view
Template.chatHome.helpers({
  dateFormat: function(date) {
    return moment(date).format('MM/DD/YYYY hh:mm A');
  },
  messages: function() {
    return Messages.find({}, {sort: {date: 1}});
  },
  usersLoggedIn: function() {
    console.log(Meteor.users.find({"status.online": true}).fetch());
    return Meteor.users.find({"status.online": true});
  }
});

// Events for this template
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
    scrollToBottom();
  }
});

Template.chatHome.onCreated(function() {
  this.subscribe("userStatus");
  this.subscribe("messages", function() {
    Tracker.afterFlush(function() {
      scrollToBottom();
    })
  });
});