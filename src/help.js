"use strict";

const colors = require(`colors/safe`);

module.exports = {
  name: `help`,
  description: `Список доступных команд`,
  availableCommands: [],
  execute() {
    console.log(`Доступные команды:`);
    this.availableCommands.forEach((command) => {
      console.log(
          `--${colors.red(command.name)}: ${colors.green(command.description)}`
      );
    });
  }
};
