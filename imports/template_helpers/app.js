import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Roles } from '/imports/roles.js';
import { $ } from 'meteor/jquery';
import { sAlert } from 'meteor/juliancwirko:s-alert';
import { Session } from 'meteor/session';

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

Template.nav.onRendered(() =>


    this.$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false,
      hover: false,
      alignment: 'right',
      gutter: 0,
      belowOrigin: true
    }),

  this.$('.button-collapse').sideNav({
    menuWidth: 240,
    activationWidth: 70,
    closeOnClick: true
  })


);

Template.loading.rendered = () => {
  if ( ! Session.get('loadingSplash') ) {
    Template.instance().loading = window.pleaseWait({
      logo: '/images/icons/meteor.png',
      backgroundColor: '#7f8c8d',
      loadingHtml: message + spinner
    });
    Session.set('loadingSplash', true); // just show loading splash once
  }
};

Template.loading.destroyed = function () {
  if ( Template.instance().loading ) {
    Template.instance().loading.finish();
    delete Session.keys['loadingSplash'];
  }
};

var message = '<p class="loading-message">Just a second</p>';
var spinner = '<div class="sk-spinner sk-spinner-rotating-plane"></div>';