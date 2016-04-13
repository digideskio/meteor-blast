import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.notFound = {
  name: 'notFound',
  action: function() {
    BlazeLayout.render('layout', { content: '404' });
  }
};