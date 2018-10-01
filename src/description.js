'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `description`,
  description: `Вывод описания программы`,
  execute() {
    console.log(`Описание программы: ${packageInfo.description.rainbow}`);
  }
};
