Template.homeIndex.helpers({
   pages: function() {
       Meteor.subscribe('getPageData', 'homeIndex');
       return Pages.find({}).fetch()[0];
   }
});

Template.homeIndex.onRendered(function() {
  $('.parallax').parallax();
});