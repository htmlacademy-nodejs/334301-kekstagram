'use strict';

var colors = require('colors');
const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Версия программы`,
  execute() {
    const version = packageInfo.version.split(`.`);
    const major = version[0];
    const minor = version[1];
    const patch = version[2];

    console.log(`Текущая версия программы: v${major.red}.${minor.green}.${patch.blue}`);
  }
};
