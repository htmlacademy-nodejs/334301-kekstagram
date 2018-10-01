'use strict';

let colors = require(`colors/safe`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `author`,
  description: `Автор программы`,
  execute() {
    console.log(`Автор программы: ${colors.cyan(packageInfo.author)}`);
  }
};
