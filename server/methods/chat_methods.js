Meteor.methods({
   addChatMessage: function(message) {
       if (message.length > 0 && this.userId) {
           Messages.insert({_userId: this.userId, message: message, date: new Date()});
       }
   }
});