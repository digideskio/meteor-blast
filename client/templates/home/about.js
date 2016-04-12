import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Pages } from '/imports/api/pages/pages.js';

Template.homeAbout.helpers({
   pages: function() {
       Meteor.subscribe('getPageData', 'homeAbout');
       return Pages.find({}).fetch()[0];
   }
});