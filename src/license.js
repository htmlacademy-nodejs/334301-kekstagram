'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `Информация о лицензии`,
  execute() {
    console.log(`Лицензия: ${packageInfo.license}`);
  }
};
