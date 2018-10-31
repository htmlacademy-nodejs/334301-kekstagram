"use strict";

let colors = require(`colors/safe`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `description`,
  description: `Вывод описания программы`,
  execute() {
    console.log(
        `Описание программы: ${colors.rainbow(packageInfo.description)}`
    );
  }
};
