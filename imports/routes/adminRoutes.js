/**
 * Admin route
 */

import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Roles } from '/imports/roles.js';

var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'adminRoutesGroup',
  triggersEnter: [
    function() {
      // Make all admin routes for logged in admins only
      if (!Meteor.userId() || !Roles.userHasRole(Meteor.userId(), 'admin')) {
        FlowRouter.go('/');
      }
    }
  ]
});

// Route /chat
adminRoutes.route('/', {
  name: 'AdminHome',
  action: function() {
    BlazeLayout.render("layout", {content: "adminHome"});
  }
});
adminRoutes.route('/users', {
  name: 'AdminUsers',
  action: function() {
    BlazeLayout.render("layout", {content: "adminUsers"});
  }
});
