'use strict';

module.exports = {
  name: `help`,
  description: `Список доступных команд`,
  execute() {
    console.log(`Доступные команды:\n--author\n--description\n--help\n--license\n--version`);
  }
};
