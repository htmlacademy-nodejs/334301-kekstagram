'use strict';

let colors = require(`colors/safe`);
const author = require(`./author`);
const description = require(`./description`);
const help = require(`./help`);
const license = require(`./license`);
const version = require(`./version`);

const command = {
  author,
  description,
  help,
  license,
  version
};

const allCommands = [];

for (const singleCommand of Object.values(command)) {
  allCommands.push(
      {
        name: singleCommand.name,
        description: singleCommand.description
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
  executableFunction = () => {
    console.error(colors.magenta(`Привет пользователь!\nЭта программа будет запускать сервер «Кекстаграм»`));
  };
} else if (allCommands.find((item) => {
  return item.name === userCommand;
})) {
  executableFunction = () => {
    command[userCommand].execute();
  };
} else {
  executableFunction = () => {
    console.error(colors.red(`Неизвестная команда: ${userCommand}\nЧтобы прочитать правила использования приложения, наберите --help`));
  };
}

module.exports = {
  execute() {
    executableFunction();
  }
};
