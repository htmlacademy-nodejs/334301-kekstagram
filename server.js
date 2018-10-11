'use strict';

let colors = require(`colors/safe`);
const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const pathFinder = require(`path`);
const {promisify} = require(`util`);
const readline = require(`readline`);

const HOSTNAME = `127.0.0.1`;
const DEFAULT_PORT = 3000;
const MIMIMUM_PORT_VALUE = 2000;

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `Write here> `
});

const showDirectory = (localPath, files) => {
  return (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Directory content</title>
    </head>
    <body>
      <ul>
          ${files.map((file) => `
            <li>
              <a href="${localPath}/${file}">${file}</a>
            </li>
          `).join(``)}
      </ul>
    </body>
    </html>
  `);
};

const readFile = async (path, res) => {
  const data = await readfile(path);

  const fileExtension = pathFinder.extname(path);
  switch (fileExtension) {
    case `.css`:
      res.setHeader(`content-type`, `text/css`);
      break;
    case `.html`:
      res.setHeader(`content-type`, `text/html; charset=UTF-8`);
      break;
    case `.jpg`:
      res.setHeader(`content-type`, `image/jpeg`);
      break;
    case `.ico`:
      res.setHeader(`content-type`, `image/x-icon`);
      break;
    default:
      res.setHeader(`content-type`, `text/plain`);
  }
  res.end(data);
};

const readDir = async (absolutePath, localPath, res) => {
  const files = await readdir(absolutePath);
  res.setHeader(`content-type`, `text/html`);
  res.end(showDirectory(localPath, files));
};

const setPort = () => new Promise((resolve) => {
  rl.question(`Хотите задать номер порта?\nВведите ${colors.green(`yes`)} или ${colors.red(`no`)}\n`, (answer) => {
    switch (answer) {
      case `yes`: {
        rl.question(`Укажите номер порта с номером больше 2000:\n`, (port) => {
          if (parseInt(port, 10) && parseInt(port, 10) > MIMIMUM_PORT_VALUE) {
            console.log(`Принято. Порту задано значение: ${colors.blue(port)}`);
            rl.close();
            resolve(parseInt(port, 10));
          } else {
            console.error(`${colors.red(`Ошибка!`)} Порту задано стандартное значение: ${colors.blue(DEFAULT_PORT)}`);
            rl.close();
            resolve(parseInt(port, 10));
          }
        });
        break;
      }
      case `no`: {
        console.log(`Принято. Порту задано стандартное значение: ${colors.blue(DEFAULT_PORT)}`);
        rl.close();
        resolve(DEFAULT_PORT);
        break;
      }
      default: {
        console.error(`Неизвестная команда: ${answer}\nПорту задано стандартное значение: ${colors.blue(DEFAULT_PORT)}`);
        rl.close();
        resolve(DEFAULT_PORT);
      }
    }
  });
});

const startServer = async () => {
  const server = http.createServer((req, res) => {
    const localPath = url.parse(req.url).pathname;
    const absolutePath = `${__dirname}/static/${localPath}`;

    (async () => {
      try {
        const pathStat = await stat(absolutePath);
        res.statusCode = 200;
        res.statusMessage = `OK`;

        if (pathStat.isDirectory()) {
          if (localPath !== `/`) {
            await readDir(absolutePath, localPath, res);
          } else {
            await readFile(`${__dirname}/static/index.html`, res);
          }
        } else {
          await readFile(absolutePath, res);
        }
      } catch (error) {
        res.writeHead(404, `Not Found`);
        res.end();
      }
    })().catch((error) => {
      res.writeHead(500, error.message, {
        'content-type': `text/plain`
      });
      res.end(error.message);
    });
  });

  const port = await setPort();

  server.listen(port, HOSTNAME, (error) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`Сервер доступен по адресу http://${HOSTNAME}:${port}/`);
  });
};

module.exports = {
  name: `server`,
  description: `Запуск сервера`,
  execute() {
    startServer();
  }
};
