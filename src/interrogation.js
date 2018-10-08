'use strict';
const readline = require(`readline`);
const fs = require(`fs`);
const dataGenerator = require(`./data-generator`);

const entities = [];

const saveFile = (filePath, data) => {
  fs.writeFile(filePath, data, (writeErr) => {
    if (writeErr) {
      throw writeErr;
    }
    console.log(`Файл был сохранен`);
    process.exit();
  });
};

const updateFile = (filePath, data, previousRl) => {
  previousRl.close();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(`По указаному пути уже существует аналогичный файл, хотите перезаписать его?\nВведите yes для обновления файла или no для отмены операции`);

  rl.on(`line`, (command) => {
    switch (command.trim().toLowerCase()) {
      case `yes`:
        rl.close();
        saveFile(filePath, data);
        break;
      case `no`:
      {
        console.log(`Программа завершена!`);
        rl.close();
        process.exit();
        break;
      }
      default:
        console.log(`Неизвестная команда: ${command.trim()}`);
        break;
    }
  });
};

const saveEntities = (path, newData, rl) => {
  const formedData = JSON.stringify(newData);

  fs.access(path, fs.constants.F_OK | fs.constants.W_OK, (err) => {
    if (err) {
      if (err.code === `ENOENT`) {
        rl.close();
        saveFile(path, formedData);
      } else {
        console.error(`Файл уже существует и не доступен только для чтения`);
      }
    } else {
      updateFile(path, formedData, rl);
    }
  });
};

const checkEntitiesNumber = (testNumber) => {
  if (parseInt(testNumber, 10) && parseInt(testNumber, 10) > 0) {
    return true;
  } else {
    return false;
  }
};

const formEntities = (newEntitesNumber, newEntites, previousRl) => {
  previousRl.close();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  if (checkEntitiesNumber(newEntitesNumber)) {
    console.log(`Цифра подходит`);
    for (let i = 0; i < parseInt(newEntitesNumber, 10); i++) {
      newEntites.push(dataGenerator.generateEntity());
    }
    rl.question(`Укажите путь до файла для сохранения данных\n`, (path) => {
      saveEntities(path, newEntites, rl);
    });
  } else {
    console.log(`Повторите ввод`);
    rl.on(`line`, (number) => {
      if (checkEntitiesNumber(number)) {
        console.log(`Цифра подходит`);
        for (let i = 0; i < parseInt(number, 10); i++) {
          newEntites.push(dataGenerator.generateEntity());
        }
        rl.question(`Укажите путь до файла для сохранения данных\n`, (path) => {
          saveEntities(path, newEntites, rl);
        });
      } else {
        console.log(`Повторите ввод`);
      }
    });
  }
};

const startInterrogationWithUser = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(`Хотите сгенерировать данные?\nВведи yes для генерации или no для завершения программы`);

  rl.on(`line`, (command) => {
    switch (command.trim().toLowerCase()) {
      case `yes`:
        rl.question(`Укажите желаемое колличество сущностей\n`, (number) => {
          formEntities(number, entities, rl);
        });
        break;
      case `no`:
      {
        console.log(`Программа завершена!`);
        rl.close();
        process.exit();
        break;
      }
      default:
        console.log(`Повторите ввод`);
        break;
    }
  });
};

module.exports = {
  startInterrogationWithUser
};
