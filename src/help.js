'use strict';

module.exports = {
  name: `help`,
  description: `Список доступных команд`,
  availableCommands: [],
  execute() {
    console.log(`Доступные команды:`);
    this.availableCommands.forEach((command) => {
      console.log(`${command}`);
    })
  }
};
