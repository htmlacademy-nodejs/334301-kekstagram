'use strict';

const command = {
  author: require(`./author`),
  description: require(`./description`),
  help: require(`./help`),
  license: require(`./license`),
  version: require(`./version`)
};

const ESCAPE_CODE_FAILURE = 1;

for (const singleCommand in command) {
  command.help.availableCommands.push(command[singleCommand].name);
}

let userCommand;
let executableFunction;

if (process.argv[2] && process.argv[2].length > 2 && process.argv[2][0] === `-` && process.argv[2][1] === `-`) {
  userCommand = process.argv[2].slice(2);
} else {
  userCommand = process.argv[2];
}

if (command.help.availableCommands.indexOf(userCommand) >= 0) {
  executableFunction = () => {
    command[userCommand].execute()
  };
} else if (!userCommand) {
  console.error(`Привет пользователь!\nЭта программа будет запускать сервер «Кекстаграм».`);
  process.exit(ESCAPE_CODE_FAILURE);
} else {
  console.error(`Неизвестная команда: ${userCommand}\nЧтобы прочитать правила использования приложения, наберите --help`);
  process.exit(ESCAPE_CODE_FAILURE);
}

module.exports = {
  execute() {
    executableFunction();
  }
};
