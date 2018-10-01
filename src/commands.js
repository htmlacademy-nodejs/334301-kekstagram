'use strict';

const author = require(`./author`);
const description = require(`./description`);
const help = require(`./help`);
const license = require(`./license`);
const version = require(`./version`);

const ESCAPE_CODE_FAILURE = 1;

let userCommand;

if (process.argv[2] && process.argv[2].length > 2) {
  userCommand = process.argv[2].slice(2);
} else {
  userCommand = process.argv[2];
}

let executableFunction;

switch (userCommand) {
  case author.name:
    executableFunction = author.execute;
    break;
  case description.name:
    executableFunction = description.execute;
    break;
  case help.name:
    executableFunction = help.execute;
    break;
  case license.name:
    executableFunction = license.execute;
    break;
  case version.name:
    executableFunction = version.execute;
    break;
  default:
  {
    executableFunction = () => {
      if (!userCommand) {
        console.error(`Привет пользователь!\nЭта программа будет запускать сервер «Кекстаграм».`);
      } else {
        console.error(`Неизвестная команда: ${userCommand}\nЧтобы прочитать правила использования приложения, наберите --help`);
      }
      process.exit(ESCAPE_CODE_FAILURE);
    };
  }
}

module.exports = {
  execute() {
    executableFunction();
  }
};
