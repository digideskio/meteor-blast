/**
 * Functions available only within the scope of this file
 */
var scrollToBottom = function() {
  console.log('called stb');
  var selector = $('.chat-window');
  if (selector[0]) {
    selector.scrollTop(selector[0].scrollHeight*10000);
  }
};


/**
 * Sidebar Helpers
 */
Template.chatSidebarAvailableUsers.helpers({
  usersLoggedIn: function() {
    return Meteor.users.find();
  }
});

Template.chatSidebarUserInfo.helpers({
  getUserProfile: function() {
    // Subscribed only to logged in users, and only able to see profile information
    var profileId = Session.get('profile') || Meteor.userId();
    return Meteor.users.find({_id: profileId}, {field: {profile: 1}}).fetch();
  }
});

Template.chatSidebarSettings.helpers({
  "toggle_timestamp_options": function(){
    return {
      "size": "mini"
    }
  },
  "toggle_B_options": function(){
    return {
      "onstyle" : "success",
      "offstyle": "danger"
    };
  }
});

/**
 * MainPanel Helpers
 */
Template.chatMainPanelWindow.helpers({
  dateFormat: function(date) {
    return moment(date).format('MM/DD/YYYY hh:mm A');
  },
  messages: function() {
    return Messages.find({}, {sort: {date: 1}});
  },
  isOwner: function(userId) {
    return userId == Meteor.userId();
  }
});

/**
 * Though the chatHome template is our main chat layout and it
 * includes all of the partials, helper functions we add here will
 * NOT be available to the partials.
 */
Template.chatHome.helpers({

});

/**
 * Unlike helpers, events are available to all partial templates
 * loaded within the "chatHome" template, though it may be cleaner
 * and more legible if the events were placed on their corresponding
 * partial templates. This works because events are available to newly
 * created DOM elements.
 */
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

/**
 * The template methods "onCreated" and "onRendered" fire automatically
 * and in that order. In this case, because of the ordering of the partials
 * in the main template, if the following methods existed they would fire
 * in this order:
 *
 *
 */
Template.chatHome.onCreated(function() {
  var self = this;
  self.subscribe("onlineProfiles");
  self.subscribe("messages");

  // Initialize settings
  Session.set('timestamp', true);
});

Template.chatMainPanelWindow.onRendered(function() {
  window.requestAnimationFrame(scrollToBottom);
});
