/**
 * Admin route
 */

import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';


var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'adminRoutesGroup',
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
adminRoutes.route('/', {
  name: 'AdminHome',
  action: function() {
    BlazeLayout.render("layout", {content: "AdminHome"});
  }
});
adminRoutes.route('/users', {
  name: 'AdminUsers',
  action: function() {
    BlazeLayout.render("layout", {content: "Users"});
  }
});
