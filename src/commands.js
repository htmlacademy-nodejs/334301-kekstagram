"use strict";

let colors = require(`colors/safe`);
const author = require(`./author`);
const description = require(`./description`);
const help = require(`./help`);
const license = require(`./license`);
const version = require(`./version`);
const interrogation = require(`./interrogation`);
const server = require(`./server`);
const logger = require(`./logger`);

const ESCAPE_CODE_FAILURE = 1;

const command = {
  author,
  description,
  help,
  license,
  version,
  server
};

const allCommands = [];
let userCommand;
let executableFunction;

for (const singleCommand of Object.values(command)) {
  allCommands.push({
    name: singleCommand.name,
    description: singleCommand.description
  });
}

command.help.availableCommands = allCommands.slice();

if (
  process.argv[2] &&
  process.argv[2].length > 2 &&
  process.argv[2][0] === `-` &&
  process.argv[2][1] === `-`
) {
  userCommand = process.argv[2].slice(2);
} else {
  userCommand = process.argv[2];
}

if (!userCommand) {
  executableFunction = () => {
    logger.info(
        colors.magenta(
            `Привет пользователь!\nЭта программа будет запускать сервер «Кекстаграм»`
        )
    );

    interrogation.startInterrogationWithUser();
  };
} else if (
  allCommands.find((item) => {
    return item.name === userCommand;
  })
) {
  executableFunction = () => {
    command[userCommand].execute();
  };
} else {
  executableFunction = () => {
    logger.error(
        colors.red(
            `Неизвестная команда: ${userCommand}\nЧтобы прочитать правила использования приложения, наберите --help`
        )
    );
    process.exit(ESCAPE_CODE_FAILURE);
  };
}

module.exports = {
  execute() {
    executableFunction();
  }
};
