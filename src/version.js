"use strict";

let colors = require(`colors/safe`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Версия программы`,
  execute() {
    const version = packageInfo.version.split(`.`);
    const major = colors.red(version[0]);
    const minor = colors.green(version[1]);
    const patch = colors.blue(version[2]);

    console.log(`Текущая версия программы: v${major}.${minor}.${patch}`);
  }
};
