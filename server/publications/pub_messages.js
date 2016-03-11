/**
 * Publish messages for the chat page, but only if the user is logged in.
 */

Meteor.publish("messages", function(num) {
  // Normally you don't want to sort on the server side (unless it's a very large
  // amount of data or you need to sort in the query to get the right documents
  // Here, we need the newest messages, so we're going to sort by date.

  // Make sure the user is logged in to receive messages
  if (this.userId) {
    return Messages.find({}, {limit: num || 50, sort: {date: -1}});
  } else {
    // Return an empty array so the waitOn method doesn't hang
    return [];
  }
});
