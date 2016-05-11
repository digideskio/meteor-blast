import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import markdown from 'markdown';

Template.registerHelper('markdown',
  (text) => (text && text.length) ? markdown.parse(text) : "");