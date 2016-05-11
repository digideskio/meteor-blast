import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import moment from 'moment';

/**
 * Uses momentJS to format a date
 */
Template.registerHelper("dateFormat",
  date => moment(date).format('MM/DD/YYYY hh:mm A'));

/**
 * Returns the current year
 */
Template.registerHelper('currentYear', function(){
  return new Date().getFullYear();
});
