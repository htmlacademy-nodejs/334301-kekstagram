"use strict";

let colors = require(`colors/safe`);
const logger = require(`./logger`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `author`,
  description: `Автор программы`,
  execute() {
    logger.info(`Автор программы: ${colors.cyan(packageInfo.author)}`);
  }
};
