Meteor.publish("getPageData", function(template) {
   return Pages.find({name: template});
});