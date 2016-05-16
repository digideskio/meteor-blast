// Import Meteor globals
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';
import { sAlert } from 'meteor/juliancwirko:s-alert';

// Import NPM packages

// Import the collections we need
import { Rooms } from '/imports/api/rooms/rooms.js';
import { Messages } from '/imports/api/messages/messages.js'

// Import our packages
import { Chatter } from '/imports/modules/chatter.js';
import { Keyboard } from '/imports/modules/keyboard.js';
import { Debug } from '/imports/modules/debug.js';

// Import our chat specific functions
import { F } from './_functions.js';

/**
 * The template methods "onCreated" and "onRendered" fire automatically
 * and in that order. onRendered does not always mean that data is finished being
 * inserted into the DOM. There is no Meteor way to be sure that data being inserted
 * into the DOM, especially from a #each block, has completed.
 */
Template.chatHome.onCreated(() => {

  // So we can access our template within subscription callbacks
  let template = Template.instance();

  // Init Session profileId for viewing profiles &
  // Set the sidebar template
  // Set the room name, just showing it should stay lowercase in the-
  // session for quicker lookup
  Session.set({
    'profileId': Meteor.userId(),
    'sidebarTemplate': 'chatSidebarAvailableUsers',
    'roomName': 'Meteor-Blast'.toLowerCase()
  });

  // Set up some subscriptions
  Template.instance().subscribe("onlineProfiles");
  // Get all rooms
  Template.instance().subscribe("getRooms");
  // Get the room data
  Template.instance().subscribe("getRoom", Session.get('roomName'),
    () => {
      //TODO: For now we know there's only one room, but this will have to be updated
      // properly when multi room functionality is added
      let currentRoom = Rooms.find({}).fetch()[0];
      Meteor.call('updateRoom', currentRoom._id);
      // After we get the room, load the messages for that room
      template.subscribe("messages", currentRoom._id, 50, () => {
        // Once the messages have been flushed to the screen remove the loading overlay
        Tracker.afterFlush(()=> {
          // Set up a MutationObserver to watch the chat window for changes
          let MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
          let myObserver = new MutationObserver(() => {
            F.scrollToBottom();
          });
          myObserver.observe($('.chat-window')[0], { childList: true, subtree: true});
          F.scrollToBottom();
          $('.loading').addClass('hide');
        });
      });
    }
  );

  // Track Meteor.userId() - once it no longer exits
  // redirect the user
  Template.instance().autorun(() => {
    if (!Meteor.userId()) {
      FlowRouter.go('/');
    }
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
Template.chatSidebarSettings.onRendered(() => {
  let settings = Meteor.user().settings;

  Template.instance().autorun(() => {
    if (!Template.instance().subscriptionsReady()) {
      return;
    }

    // Get all the switch-settings and set their default value
    // Because this is being done in autorun(), if any of these values
    // change, this will rerun
    $('.switch-setting').toArray().forEach(s =>
      $(s).attr('checked', settings && settings[$(s).data('name')]));
  });

});

/**
 * Do some cleanup when this template is destroyed
 */
Template.chatHome.onDestroyed(() => {
  // Remove the keydown event from the document
  $(document).off('keydown');
  // Clear some session variables
  Session.set('history', null);
  Session.set('issues', null);
  Session.set('todo', null);
  Session.set('commands', null);
});