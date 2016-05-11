/**
 * Chatter is a package that will take a message or command to Chatter.parse(string) and
 * return an object.
 *
 * Written by Nate Brady (@NateBrady23)
 */

import { Meteor } from 'meteor/meteor';
import { Roles } from '/imports/modules/roles.js';
import { Debug } from '/imports/modules/debug.js';

import moment from 'moment';


export const Chatter = {

};

// Available commands
let Command = {
  help: {
    help: `USAGE: /help [command]
           Returns help for a command.`,
    commandType: 'info',
    exec: (args) => {
        return (args && Command[args] && Command[args].help) ?
          { info: Command[args].help} 
          : { error: "There is no help available for that command." };
    }
  },
  image: {
    help: `USAGE: /image [url] [OPTIONAL: Alt text]<br />
           Displays an image to the chat room.`,
    commandType: 'message',
    exec: (args) => {
      if (args && args.length) {
        return (args.length == 1) ? { message: `![${args[0]}](${args[0]})` }
          : { message: `![${args[1]}](${args[0]})`};
      }
      return { error: 'Please enter the image url' };
    }
  },
  purge: {
    help: `USAGE: /purge<br />
           Deletes all messages in a room.`,
    commandType: 'room',
    role: 'admin',
    exec: () => {
      Meteor.call('purgeMessages', Meteor.user().currentRoomId);
      return {
        'type': 'room',
        'message': 'Messages in the room have been deleted.',
        'info': `Messages in this room have been deleted.`
      };
    }
  },
  time: {
    help: `USAGE: /time<br />
           Displays the server date & time.`,
    commandType: 'info',
    exec: () => {
      return   {
        'info': `Server time is currently: ${moment(Date.now()).format('MM/DD/YYYY hh:mm A')}`
      };
    }
  },
  topic: {
    help: `USAGE: /topic [msg]<br />
           Sets a room topic.`,
    commandType: 'room',
    role: 'admin',
    exec: (args) => {
      // TODO: Validation - we're assuming too much right now
      // We're accepting the user from the client and believing it

      Debug.log('parse.js: Command.topic.exec()', args);
      // Get the current room the user who called the command is in
      Meteor.call('roomsUpdateTopic', Meteor.user().currentRoomId, args.join(' '));
      return {
        'info': `The topic has been changed.`
      };
    }
  }
};

/**
 * Alias some commands
 */
Command['?'] = Command.help;
Command.img = Command.image;

/**
 * Chatter the message for commands, etc
 */
Chatter.parse = msg => {

  if (msg) {
    msg = msg.trim();
  }

  if (!msg || !msg.length) {
    return {
      'error': 'Please enter a message.'
    }
  }

  // If we have a command, lets do something else
  if (Chatter.isCommand(msg)) {
    return Chatter.parseCommand(msg);
  }

  // Otherwise we have a regular message
  // TODO: More validations
  return {
    'message': msg
  }
};

/**
 * Returns true of the msg string begins with a '/' and an additional character
 * @param msg
 */
Chatter.isCommand = msg =>
  (msg && msg.length > 1 && msg[0] === '/');

/**
 * Runs the function that corresponds to a given command
 * @param msg
 */
Chatter.parseCommand = msg => {
  // Remove the '/' from the command
  // and any extra spaces
  msg = msg.slice(1).replace(/\s+/, ' ');
  let com = msg, args = [];

  if (msg.includes(' ')) {
    com = msg.split(' ')[0];
    args = msg.split(' ').slice(1);
  }

  // If the command exists
  if (Object.keys(Command).includes(com)) {
    // If role exists for that command, make sure the user is in the proper role
    if (Command[com].role) {
      if (Roles.userHasRole(Meteor.user(), Command[com].role)) {
        return Command[com].exec(args);
      } else {
        return {
          'error': 'You do not have the proper privileges for this command.'
        }
      }
    }
    return Command[com].exec(args);
  }

  return {
    'error': 'Invalid command.'
  }
};