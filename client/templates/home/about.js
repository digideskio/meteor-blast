Template.homeAbout.helpers({
   pages: function() {
       Meteor.subscribe('getPageData', 'homeAbout');
       return Pages.find({}).fetch()[0];
   }
});