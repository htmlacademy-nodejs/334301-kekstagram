'use strict';
const readline = require(`readline`);
const fs = require(`fs`);
const dataGenerator = require(`./data-generator`);

const entities = [];

const creatNewInterface = () => {
  const newRL = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `Write here> `
  });

  return newRL;
};

const saveFile = (filePath, data) => {
  fs.writeFile(filePath, data, (writeErr) => {
    if (writeErr) {
      throw writeErr;
    }
    console.log(`Файл был сохранен`);
    process.exit();
  });
};

const updateFile = (filePath, data) => {
  const rl = creatNewInterface();

  console.log(`По указаному пути уже существует аналогичный файл, хотите перезаписать его?\nВведите yes для обновления файла или no для отмены операции`);

  rl.prompt();

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

    rl.prompt();
  });
};

const saveEntities = (newData) => {
  const formedData = JSON.stringify(newData);
  const rl = creatNewInterface();

  console.log(`Укажите путь до файла для сохранения данных`);

  rl.prompt();

  rl.on(`line`, (newPath) => {
    fs.access(newPath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
      if (err) {
        if (err.code === `ENOENT`) {
          rl.close();
          saveFile(newPath, formedData);
        } else {
          console.error(`Файл уже существует и не доступен только для чтения`);
        }
      } else {
        rl.close();
        updateFile(newPath, formedData);
      }
    });
  });
};

const formEntities = (newEntites) => {
  const rl = creatNewInterface();

  console.log(`Укажите желаемое колличество сущностей`);

  rl.prompt();

  rl.on(`line`, (number) => {
    if (parseInt(number, 10) && parseInt(number, 10) > 0) {
      console.log(`Цифра подходит`);
      for (let i = 0; i < parseInt(number, 10); i++) {
        newEntites.push(dataGenerator.generateEntity());
      }
      rl.close();
    } else {
      console.log(`Повторите ввод`);
    }

    rl.prompt();
  }).on(`close`, () => {
    saveEntities(newEntites);
  });
};

const startInterrogationWithUser = () => {
  const rl = creatNewInterface();

  console.log(`Хотите сгенерировать данные?\nВведи yes для генерации или no для завершения программы`);

  rl.prompt();

  rl.on(`line`, (command) => {
    switch (command.trim().toLowerCase()) {
      case `yes`:
        rl.close();
        formEntities(entities);
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

    rl.prompt();
  });
};

module.exports = {
  startInterrogationWithUser
};
