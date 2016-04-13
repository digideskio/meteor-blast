/**
 * Home routes
 */

import { FlowRouter } from 'meteor/kadira:flow-router';

var homeRoutes = FlowRouter.group({
  prefix: '/',
  name: 'homeRoutesGroup',
  triggersEnter: [
    function() {
      // Put code here if you want something to happen before entering any home route
    }
  ],
  triggersExit: [
    function() {
      // Put code here if you want something to happen before exiting any home route
    }
  ]
});

FlowRouter.route('/', {
  name: 'home',
  action: function() {
    BlazeLayout.render("layout", {content: "homeIndex"});
  }
});

FlowRouter.route('/about', {
  name: 'about',
  action: function() {
    BlazeLayout.render("layout", {content: "homeAbout"});
  }
});

FlowRouter.route('/contact', {
  name: 'contact',
  action: function() {
    BlazeLayout.render("layout", {content: "homeContact"});
  }
});