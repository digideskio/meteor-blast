var commands = [
  "time"
];

export const Parse = {
  "parse": (msg) => {
    msg = msg.trim();
    if (Parse.isCommand(msg)) {
      let command = msg.split(' ');
      command = command.slice(1);
      console.log(command);
      if (commands.indexOf(command[0]) > -1) {
        console.log("Is a command");
      } else {
        console.log("Invalid command");
      }
    }
    return msg;
  },

  "isCommand": (msg) => (msg && msg.length > 1 && msg[0] === '/')
};