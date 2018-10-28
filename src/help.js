"use strict";

let colors = require(`colors/safe`);
const logger = require(`./logger`);

module.exports = {
  name: `help`,
  description: `Список доступных команд`,
  availableCommands: [],
  execute() {
    logger.info(`Доступные команды:`);
    this.availableCommands.forEach((command) => {
      logger.info(
          `--${colors.red(command.name)}: ${colors.green(command.description)}`
      );
    });
  }
};
