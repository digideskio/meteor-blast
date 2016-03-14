Template.homeIndex.helpers({
   pages: function() {
       Meteor.subscribe('homePages');
       return Pages.find({name: 'home'}).fetch()[0];
   }
});

Template.homeIndex.events({
    "click .editable": function(event) {
        var selector = $(event.target);
        var text = selector.html();
        selector.addClass('savable');
        selector.html("<form class='savable'>" +
            "<input type='text' value='" + text + "'>" +
            "<button></button>" +
            "</form>");
    },
    "submit .savable": function(event) {
        var selector = $(event.target);
    }
});