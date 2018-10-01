'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `author`,
  description: `Автор программы`,
  execute() {
    console.log(`Автор программы: ${packageInfo.author.cyan}`);
  }
};
