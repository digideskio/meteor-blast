// Functions available to this template js file only
var scrollToBottom = function() {
  var selector = $('.chat-window');
  if (selector[0]) {
    selector.scrollTop(selector[0].scrollHeight*10000);
  }
};

var thisTracker;

// Functions that are available in the view
Template.chatHome.helpers({
  dateFormat: function(date) {
    return moment(date).format('MM/DD/YYYY hh:mm A');
  },
  messages: function() {
    return Messages.find({}, {sort: {date: 1}});
  },
  usersLoggedIn: function() {
    return Meteor.users.find();
  },
  isOwner: function(userId) {
    return userId == Meteor.userId();
  },
  scroll: function(messages) {
    if (messages && !messages.length)
      scrollToBottom();
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
  },
  "click .btn-scroll": function(event) {
    scrollToBottom();
  },
  "click .btn-available-users": function(event) {
    $('.side-panel').addClass('hide');
    $('.available-users').removeClass('hide');
  },
  "click .btn-user-info": function(event) {
    $('.side-panel').addClass('hide');
    $('.user-info').removeClass('hide');
  },
  "click .btn-settings": function(event) {
    $('.side-panel').addClass('hide');
    $('.settings').removeClass('hide');
  }
});

Template.chatHome.onRendered(function() {
  var self = this;
  self.subscribe("userStatus");
  self.subscribe("messages");
});