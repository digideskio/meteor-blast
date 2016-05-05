import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Roles } from '/imports/modules/roles.js';
import { $ } from 'meteor/jquery';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { Session } from 'meteor/session';

Template.layout.events({
  "click span.editable": event => {
    /**
     * Editable areas should be wrapped in a span tag with a
     * data-page having the template it's targeting, and an id
     * which will be the key of the value being changed
     *
     * <span data-template='homeIndex' id='title' class='editable'>
     *   Some editable text
     * </span>
     */
    if (Roles.userHasRole(Meteor.user(), 'admin')) {

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
  "focusout .savable": event => {

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

Template.nav.onRendered(() => {
  // TODO: This is the only way to ensure that all the proper pieces have been inserted
  // into the DOM. document.ready doesn't work because the document will think it is ready
  // because we're doing reactive conditional statements in the template. This type of
  // functionality should be avoided, and probably another reason to see how ReactJS handles
  // something like this.
  setTimeout(() => {
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false,
      hover: false,
      alignment: 'right',
      gutter: 0,
      belowOrigin: true
    });

    $('.button-collapse').sideNav({
      menuWidth: 240,
      activationWidth: 70,
      closeOnClick: true
    });
  }, 600);
});

Template.loading.rendered = () => {
  let message = '<p class="loading-message">Just a second</p>';
  let spinner = '<div class="sk-spinner sk-spinner-rotating-plane"></div>';

  if ( ! Session.get('loadingSplash') ) {
    Template.instance().loading = window.pleaseWait({
      logo: '/images/icons/meteor.png',
      backgroundColor: '#7f8c8d',
      loadingHtml: message + spinner
    });
    Session.set('loadingSplash', true); // just show loading splash once
  }
};

Template.loading.destroyed = () => {
  if ( Template.instance().loading ) {
    Template.instance().loading.finish();
    delete Session.keys['loadingSplash'];
  }
};