/**
 * Chat route
 */

import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

var chatRoutes = FlowRouter.group({
  prefix: '/chat',
  name: 'chatRoutesGroup',
  triggersEnter: [
    function() {
      // Make all chat routes for logged in users only
      if (!Meteor.userId()) {
        FlowRouter.go('/');
      }
    }
  ]
});

// Route /chat
chatRoutes.route('/', {
  name: 'chat',
  action: function() {
    BlazeLayout.render("layout", {content: "chatHome", nav: "none", footer: "none"});
  }
});
