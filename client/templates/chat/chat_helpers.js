/**
 * Functions available only within the scope of this file
 */
var scrollToBottom = function() {
  var selector = $('.chat-window');
  if (selector[0]) {
    selector.scrollTop(selector[0].scrollHeight*10000);
  }
};

var swapSidePanel = function(panel, button) {
  $('.side-panel').addClass('hide');
  $('.btn-info').removeClass('active');
  panel.removeClass('hide');
  button.addClass('active');
};

/**
 * Sidebar Helpers
 */
Template.chatSidebarAvailableUsers.helpers({
  usersLoggedIn: function() {
    return Meteor.users.find().fetch().filter(function(u) {
      return u.status && u.status.online;
    });
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
    var msgs = Messages.find({}, {sort: {date: 1}}).fetch();
    // Subscribe to the profile and setting information of every user we have a message for
    msgs.forEach(function(m) {
      Meteor.subscribe("userProfileInfo", m._userId);
    });
    return Messages.find({}, {sort: {date: 1}}).fetch();
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
 * This is another way to register helper functions to templates. This method
 * makes the function available to all templates. Normally, you would want a global
 * registered function in your templates/main.js file, but since for now I'm only
 * using it within the chat folder for all chat templates/sub-templates, I'll leave
 * it here.
 */
Template.registerHelper("getUser", function(userId) {
  // Meteor will only subscribe to the user once
  Meteor.subscribe("userProfileInfo", userId);
  return Meteor.users.find({_id: userId}).fetch()[0];
});

Template.registerHelper("getSessionData", function(key) {
  return Session.get(key);
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
  "click .btn-scroll": function() {
    scrollToBottom();
  },
  "click .btn-available-users": function() {
    swapSidePanel($('.available-users'), $('.btn-available-users'));
  },
  "click .btn-user-info": function() {
    swapSidePanel($('.user-info'), $('.btn-user-info'));
  },
  "click .btn-settings": function() {
    swapSidePanel($('.settings'), $('.btn-settings'));
  },
  "mouseover .loggedin-user": function() {
    console.log('hovering over a logged in user');
  },
  "click .loggedin-user": function(event) {
    Session.set('profileId', $(event.target).data('userid'));
    swapSidePanel($('.user-info'), $('.btn-user-info'));
  }
});

/**
 * Listening to events for changing settings.
 */
Template.chatSidebarSettings.events({
  "click .switch-setting": function(event) {
    event.stopPropagation();
    var settingName = $(event.target).data('name');
    var status = $(event.target).attr('checked');
    // Update with the opposite of the current status
    console.log(settingName);
    $(event.target).attr('checked', !status);
    Meteor.call('updateSetting', settingName, !status);
  }
});

/**
 * The template methods "onCreated" and "onRendered" fire automatically
 * and in that order. onRendered does not mean that data is finished being
 * inserted into the DOM - use Tracker.afterFlush
 */
Template.chatHome.onCreated(function() {
  var self = this;
  // Init Session profileId for viewing profiles
  Session.set('profileId', Meteor.userId());

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
 *
 * It's important to note that the setting may not exist. We want to be
 * able to add settings later and not have to update every user in the DB. It
 * will only create a DB entry for that user if they change the default value.
 */
Template.chatSidebarSettings.onRendered(function() {
  var self = this;

  self.autorun(function() {
    if (!self.subscriptionsReady()) {
      return;
    }
    var settings = Meteor.user().settings;

    // Get all the switch-settings and set their default value
    $('.switch-setting').toArray().forEach(function(s) {
      $(s).attr('checked', settings && settings[$(s).data('name')]);
    });

  });
});
