/**
 * Parse is a package that will take a message or command to Parse.parse(string) and
 * return an object.
 *
 * Written by Nate Brady (@NateBrady23)
 */

import moment from 'moment';


export const Parse = {

};

// Available commands
let Command = {
  help: {
    help: 'USAGE: /help <command>',
    commandType: 'info',
    exec: (args) => {
        return (args && Command[args] && Command[args].help) ?
          {
            info: Command[args].help
          } : {
            error: "There is no help available for that command."
          }
    }
  },
  time: {
    help: `USAGE: /time
           Displays the server date & time.`,
    commandType: 'info',
    exec: () => {
      return   {
        'info': `Server time is currently: ${moment(Date.now()).format('MM/DD/YYYY hh:mm A')}`
      }
    }
  }
};

/**
 * Parse the message for commands, etc
 */
Parse.parse = msg => {

  if (msg) {
    msg = msg.trim();
  }

  if (!msg || !msg.length) {
    return {
      'error': 'Please enter a message.'
    }
  }

  // If we have a command, lets do something else
  if (Parse.isCommand(msg)) {
    return Parse.parseCommand(msg);
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
Parse.isCommand = msg =>
  (msg && msg.length > 1 && msg[0] === '/');

/**
 * Runs the function that corresponds to a given command
 * @param msg
 */
Parse.parseCommand = msg => {
  // Remove the '/' from the command
  // and any extra spaces
  msg = msg.slice(1).replace(/\s+/, ' ');
  let com = msg, args = [];

  if (msg.includes(' ')) {
    com = msg.split(' ')[0];
    args = msg.split(' ').slice(1);
  }

  if (Object.keys(Command).includes(com)) {
    return Command[com].exec(args);
  }

  return {
    'error': 'Invalid command.'
  }
};