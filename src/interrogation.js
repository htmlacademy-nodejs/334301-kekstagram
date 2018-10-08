'use strict';
const readline = require(`readline`);
const fs = require(`fs`);
const dataGenerator = require(`./data-generator`);

const entities = [];

const createInterface = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return rl;
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
  const rl = createInterface();

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

const saveEntities = (newData) => {
  const rl = createInterface();

  let path;

  rl.question(`Укажите путь до файла для сохранения данных\n`, (newPath) => {
    path = newPath;
  });

  const formedData = JSON.stringify(newData);

  fs.access(path, fs.constants.F_OK | fs.constants.W_OK, (err) => {
    if (err) {
      if (err.code === `ENOENT`) {
        rl.close();
        saveFile(path, formedData);
      } else {
        console.error(`Файл уже существует и не доступен только для чтения`);
        process.exit(1);
      }
    } else {
      rl.close();
      updateFile(path, formedData);
    }
  });
};

const formEntities = (newEntities) => {
  const rl = createInterface();
  const data = newEntities;

  console.log(`Укажите желаемое колличество сущностей`);

  rl.on(`line`, (number) => {
    if (parseInt(number, 10) && parseInt(number, 10) > 0) {
      console.log(`Цифра подходит`);
      for (let i = 0; i < parseInt(number, 10); i++) {
        data.push(dataGenerator.generateEntity());
      }
      rl.close();
    } else {
      console.log(`Повторите ввод`);
    }
  });
};

const startProcess = (inputArray) => {
  const rl = createInterface();

  console.log(`Хотите сгенерировать данные?\nВведи yes для генерации или no для завершения программы`);

  rl.on(`line`, (command) => {
    switch (command.trim().toLowerCase()) {
      case `yes`:
      {
        rl.close();
        return inputArray;
        break;
      }
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

const startInterrogationWithUser = () => {
  Promise.resolve(entities)
  .then(startProcess)
  .then(formEntities)
  .catch((error) => {
    console.log(error);
  });
};

module.exports = {
  startInterrogationWithUser
};
