import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Pages } from '/imports/api/pages/pages.js';

Template.homeIndex.helpers({
   pages: function() {
       Meteor.subscribe('getPageData', 'homeIndex');
       return Pages.find({}).fetch()[0];
   }
});

Template.homeIndex.onRendered(function() {
  // Initialize the materialize parallax plugin
  $('.parallax').parallax();
});