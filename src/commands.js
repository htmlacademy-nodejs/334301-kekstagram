'use strict';

var colors = require('colors');
const command = {
  author: require(`./author`),
  description: require(`./description`),
  help: require(`./help`),
  license: require(`./license`),
  version: require(`./version`)
};

const ESCAPE_CODE_FAILURE = 1;

const allCommands = [];

for (const singleCommand in command) {
  allCommands.push(
    {
      name: command[singleCommand].name,
      description: command[singleCommand].description
    }
  );
}

command.help.availableCommands = allCommands.slice();

let userCommand;
let executableFunction;

if (process.argv[2] && process.argv[2].length > 2 && process.argv[2][0] === `-` && process.argv[2][1] === `-`) {
  userCommand = process.argv[2].slice(2);
} else {
  userCommand = process.argv[2];
}

if (!userCommand) {
  console.error(`Привет пользователь!\nЭта программа будет запускать сервер «Кекстаграм»`.magenta);
  process.exit(ESCAPE_CODE_FAILURE);
}

for (let i = 0; i < allCommands.length; i++) {
  if (allCommands[i].name === userCommand) {
    executableFunction = () => {
      command[userCommand].execute()
    };
    break;
  }
}

if (!executableFunction) {
  console.error(`Неизвестная команда: ${userCommand}\nЧтобы прочитать правила использования приложения, наберите --help`.red);
  process.exit(ESCAPE_CODE_FAILURE);
}

module.exports = {
  execute() {
    executableFunction();
  }
};
