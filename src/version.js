'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Версия программы`,
  execute() {
    console.log(`Текущая версия программы: v${packageInfo.version}`);
  }
};
