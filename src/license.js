"use strict";

let colors = require(`colors/safe`);
const logger = require(`./logger`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `Информация о лицензии`,
  execute() {
    logger.info(`Лицензия: ${colors.yellow(packageInfo.license)}`);
  }
};
