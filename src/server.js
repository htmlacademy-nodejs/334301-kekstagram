"use strict";

const express = require(`express`);
const postsStore = require(`./posts/store`);
const imagesStore = require(`./images/store`);
const postsRouter = require(`./posts/route`)(postsStore, imagesStore);
const logger = require(`./logger`);

const MIMIMUM_PORT_VALUE = 2000;

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};
const ERROR_HANDLER = (err, req, res, _next) => {
  if (err) {
    logger.error(err);
    res.status(err.code || 500).send(err.message);
  }
};

const {SERVER_PORT = 3000, SERVER_HOST = `localhost`} = process.env;

const app = express();

app.use(express.static(`${__dirname}/../static`));

app.use(`/api/posts`, postsRouter);

app.use(NOT_FOUND_HANDLER);

app.use(ERROR_HANDLER);

const startServer = async () => {
  const port =
    process.argv[3] &&
    parseInt(process.argv[3], 10) &&
    parseInt(process.argv[3], 10) >= MIMIMUM_PORT_VALUE
      ? parseInt(process.argv[3], 10)
      : SERVER_PORT;

  app.listen(port, SERVER_HOST, () =>
    logger.info(`Сервер запущен: http://${SERVER_HOST}:${port}`)
  );
};

module.exports = {
  name: `server`,
  description: `Запуск сервера`,
  execute() {
    startServer();
  },
  app
};
