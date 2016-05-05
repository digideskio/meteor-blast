/**
 * This is the main entry point for the client app.
 */
import { Meteor } from 'meteor/meteor';

// Import all client config files
import '/imports/config/client/';

// Import our template helpers
import '/imports/template_helpers/_core/_core.js';
import '/imports/template_helpers/admin/admin.js';
import '/imports/template_helpers/app/app.js';
import '/imports/template_helpers/chat/chat.js';
import '/imports/template_helpers/home/home.js';


// Import all the collection api's needed by the client
import '/imports/api/messages/client/';
import '/imports/api/pages/client/';
import '/imports/api/users/client/';
import '/imports/api/rooms/client/';

// Import our routes
import '/imports/routes/';


// Subscribe to the user, if logged in
Meteor.subscribe('ownerInfo');
