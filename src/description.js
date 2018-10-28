"use strict";

let colors = require(`colors/safe`);
const logger = require(`./logger`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `description`,
  description: `Вывод описания программы`,
  execute() {
    logger.info(
        `Описание программы: ${colors.rainbow(packageInfo.description)}`
    );
  }
};
