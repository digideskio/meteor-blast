Meteor.publish("homePages", function() {
   return Pages.find({name: 'home'});
});