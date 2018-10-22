"use strict";

let colors = require(`colors/safe`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `Информация о лицензии`,
  execute() {
    console.log(`Лицензия: ${colors.yellow(packageInfo.license)}`);
  }
};
