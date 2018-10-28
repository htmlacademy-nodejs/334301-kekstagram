"use strict";

let colors = require(`colors/safe`);
const readline = require(`readline`);
const fs = require(`fs`);
const path = require(`path`);
const dataGenerator = require(`./data-generator`);
const mkdirp = require(`mkdirp`);
const logger = require(`./logger`);

const DEFAULT_FILE = `posts.json`;
const DEFAULT_PATH = `${process.cwd()}/api`;

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
const entities = [];

const createInterface = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `Write here> `
  });

  return rl;
};

const saveFile = (filePath, data) => {
  if (path.extname(filePath) && path.dirname(filePath) !== process.cwd()) {
    mkdirp(path.dirname(filePath), (err) => {
      if (err) {
        logger.error(err);
      }
    });
  }

  if (!path.extname(filePath)) {
    mkdirp(filePath, (err) => {
      if (err) {
        logger.error(err);
      }
    });

    filePath = filePath + `/` + DEFAULT_FILE;
  }

  fs.writeFile(filePath, JSON.stringify(data), fileWriteOptions, (writeErr) => {
    if (writeErr) {
      throw writeErr;
    }
    logger.info(colors.green(`Данные были сохранены в файл: ${filePath}`));
    process.exit();
  });
};

const updateFile = (filePath, data) => {
  const rl = createInterface();

  console.log(
      `По указаному пути уже существует аналогичный файл, хотите перезаписать его?\nВведите ${colors.green(
          `yes`
      )} для обновления файла или ${colors.red(`no`)} для отмены операции`
  );

  rl.prompt();

  rl.on(`line`, (command) => {
    switch (command.trim().toLowerCase()) {
      case `yes`:
        rl.close();
        saveFile(filePath, data);
        break;
      case `no`: {
        console.log(colors.red(`Выберите другой файл`));
        rl.close();
        saveEntities(data);
        break;
      }
      default:
        console.log(colors.red(`Неизвестная команда: ${command.trim()}`));
        break;
    }
    rl.prompt();
  });
};

const saveEntities = (newData) => {
  const rl = createInterface();
  const formedData = JSON.stringify(newData);

  let dataPath;

  console.log(`Укажите путь до файла для сохранения данных`);

  rl.prompt();

  rl.on(`line`, (newPath) => {
    if (!newPath) {
      dataPath = DEFAULT_PATH + `/` + DEFAULT_FILE;
    } else {
      dataPath = newPath;
    }

    fs.access(dataPath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
      if (err) {
        if (err.code === `ENOENT`) {
          rl.close();
          saveFile(dataPath, formedData);
        } else {
          logger.error(
              colors.red(`Файл уже существует и не доступен только для чтения`)
          );
          console.log(colors.red(`Выберите другой файл`));
        }
      } else {
        rl.close();
        updateFile(dataPath, formedData);
      }
    });
  });
};

const formEntities = (newEntities) =>
  new Promise((resolve) => {
    const rl = createInterface();
    const data = newEntities;

    console.log(`Укажите желаемое колличество сущностей`);

    rl.prompt();

    rl.on(`line`, (number) => {
      if (parseInt(number, 10) && parseInt(number, 10) > 0) {
        for (let i = 0; i < parseInt(number, 10); i++) {
          data.push(dataGenerator.generateEntity());
        }
        rl.close();
        logger.info(`Создано ${colors.blue(number)} сущностей`);
        resolve(data);
      } else {
        console.log(colors.red(`Повторите ввод`));
        rl.prompt();
      }
    });
  });

const startProcess = (inputArray) =>
  new Promise((resolve) => {
    const rl = createInterface();

    console.log(
        `Хотите сгенерировать данные?\nВведи ${colors.green(
            `yes`
        )} для генерации или ${colors.red(`no`)} для завершения программы`
    );

    rl.prompt();

    rl.on(`line`, (command) => {
      switch (command.trim().toLowerCase()) {
        case `yes`: {
          rl.close();
          resolve(inputArray);
          break;
        }
        case `no`: {
          rl.close();
          logger.info(colors.green(`Программа завершена!`));
          process.exit();
          break;
        }
        default:
          console.log(colors.red(`Повторите ввод`));
          break;
      }
      rl.prompt();
    });
  });

const startInterrogationWithUser = () => {
  Promise.resolve(entities)
    .then(startProcess)
    .then(formEntities)
    .then(saveEntities)
    .catch((error) => {
      logger.error(error);
    });
};

module.exports = {
  startInterrogationWithUser
};
