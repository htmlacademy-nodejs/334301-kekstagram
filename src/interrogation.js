'use strict';

let colors = require(`colors/safe`);
const readline = require(`readline`);
const fs = require(`fs`);
const dataGenerator = require(`./data-generator`);

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
  fs.writeFile(filePath, data, (writeErr) => {
    if (writeErr) {
      throw writeErr;
    }
    console.log(colors.green(`Файл был сохранен`));
    process.exit();
  });
};

const updateFile = (filePath, data) => {
  const rl = createInterface();

  console.log(`По указаному пути уже существует аналогичный файл, хотите перезаписать его?\nВведите ${colors.green(`yes`)} для обновления файла или ${colors.red(`no`)} для отмены операции`);

  rl.prompt();

  rl.on(`line`, (command) => {
    switch (command.trim().toLowerCase()) {
      case `yes`:
        rl.close();
        saveFile(filePath, data);
        break;
      case `no`:
      {
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

  let path;

  console.log(`Укажите путь до файла для сохранения данных`);

  rl.prompt();

  rl.on(`line`, (newPath) => {
    path = newPath;

    fs.access(path, fs.constants.F_OK | fs.constants.W_OK, (err) => {
      if (err) {
        if (err.code === `ENOENT`) {
          rl.close();
          saveFile(path, formedData);
        } else {
          console.error(colors.red(`Файл уже существует и не доступен только для чтения`));
          console.log(colors.red(`Выберите другой файл`));
        }
      } else {
        rl.close();
        updateFile(path, formedData);
      }
    });
  });
};

const formEntities = (newEntities) => new Promise((resolve) => {
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
      console.log(`Создано ${colors.blue(number)} сущностей`);
      resolve(data);
    } else {
      console.log(colors.red(`Повторите ввод`));
      rl.prompt();
    }
  });
});

const startProcess = (inputArray) => new Promise((resolve) => {
  const rl = createInterface();

  console.log(`Хотите сгенерировать данные?\nВведи ${colors.green(`yes`)} для генерации или ${colors.red(`no`)} для завершения программы`);

  rl.prompt();

  rl.on(`line`, (command) => {
    switch (command.trim().toLowerCase()) {
      case `yes`:
      {
        rl.close();
        resolve(inputArray);
        break;
      }
      case `no`:
      {
        rl.close();
        console.log(colors.green(`Программа завершена!`));
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
    console.error(error);
  });
};

module.exports = {
  startInterrogationWithUser
};
