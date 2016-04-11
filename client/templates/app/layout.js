Template.layout.events({
  "click span.editable": function(event) {
    /**
     * Editable areas should be wrapped in a span tag with a
     * data-page having the template it's targeting, and an id
     * which will be the key of the value being changed
     *
     * <span data-template='homeIndex' id='title' class='editable'>
     *   Some editable text
     * </span>
     */
    if (Roles.userIsInRole(Meteor.user(), ['admin'], 'admin-group')) {

      var selector = $(event.currentTarget),
        formSelector;
      var text = selector.html().trim(),
        id = selector.attr('id');

      sAlert.info('Click away when done editing.', {position: 'top-right'});

      // Remove the .editable class for now so they can't double-click
      selector.removeClass('editable');

      // Create the form
      selector.html("<form class='savable' method='post'>" +
        "<input id='" + id + "' type='text' value='' data-old=''>" +
        "</form>");

      // Focus first, then add attributes so cursor is at end
      formSelector = $('input#'+id);
      formSelector.val('');
      formSelector.focus();
      formSelector.data('old', text);
      formSelector.val(text);
    }
  },
  "focusout .savable": function(event) {

    event.preventDefault();
    var selector = $(event.target);
    var id = selector.attr('id'),
      value = selector.val().trim(),
      oldValue = selector.data('old').trim();
    var parent = $('#' + id);
    var template = parent.data('template');

    // If the value changed clear the html so the page can update reactively
    // Otherwise, put the original value back and clear the form

    // We don't want to allow empty values.
    if (!value.length) {
      sAlert.error('New value cannot be empty.', {position: 'top-right'});
      parent.html(oldValue);
    } else if (value != oldValue) {
      Meteor.call('updatePage', template, id, value);
      parent.html("");
    } else {
      parent.html(oldValue);
    }
    parent.addClass('editable');

  }

});