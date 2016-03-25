/**
 * Functions available only within the scope of this file
 */
var scrollToBottom = function() {
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
    // Subscribed only to logged in users, and only able to see profile/settings information
    var profileId = Session.get('profile') || Meteor.userId();
    return Meteor.users.find({_id: profileId}).fetch();
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
  },
  showTimestamp: function() {
    return (Meteor.user().settings || []).timestamp !== false;
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
 * Listening to events for changing settings.
 */
Template.chatSidebarSettings.events({
  "click .toggle-setting": function(event) {
    event.stopPropagation();
    var settingName = $(event.target).closest('span').data('name');
    Meteor.call('updateSetting', settingName, true);
  }
});

/**
 * The template methods "onCreated" and "onRendered" fire automatically
 * and in that order. onRendered does not mean that data is finished being
 * inserted into the DOM - use Tracker.afterFlush
 */
Template.chatHome.onCreated(function() {
  var self = this;
  self.subscribe("onlineProfiles");
  self.subscribe("messages", function() {
    Tracker.afterFlush(function() {
      window.requestAnimationFrame(scrollToBottom);
    });
  });
});

/**
 * Here we're going to update the view of the settings panel
 * based on the saved user settings. If a setting changes in
 * the database, the view will be updated accordingly.
 */
Template.chatSidebarSettings.onRendered(function() {
  var self = this;

  // PROBLEM: Sometimes this returns with bootstrapToggle is not a function
  $('.toggle-button').bootstrapToggle();

  self.autorun(function() {
    if (!self.subscriptionsReady()) {
      return;
    }
    var settings = Meteor.user().settings;
    // Make sure the settings object exists. Users aren't initially created with settings.
    if (settings) {
      //timestamp default is on
      $('#toggle-timestamp').bootstrapToggle(settings.timestamp !== false ? 'on' : 'off');
    } else {
      // Set default state for items that are on by default
      $('#toggle-timestamp').bootstrapToggle('on');
    }
  });
});
