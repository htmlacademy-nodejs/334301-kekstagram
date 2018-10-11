'use strict';

const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const pathFinder = require(`path`);
const {promisify} = require(`util`);

const HOSTNAME = `127.0.0.1`;
const DEFAULT_PORT = 3000;
const MIMIMUM_PORT_VALUE = 2000;

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);

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

const setPort = () => {
  const possiblePort = process.argv[3];
  if (possiblePort && parseInt(possiblePort, 10) && parseInt(possiblePort, 10) >= MIMIMUM_PORT_VALUE) {
    return possiblePort;
  }

  console.error(`Номер порта не может быть меньше ${MIMIMUM_PORT_VALUE}. Присвоено стандартное значение ${DEFAULT_PORT}`);
  return DEFAULT_PORT;
};

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

  const port = setPort();

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
