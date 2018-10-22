"use strict";

const express = require(`express`);
const postsStore = require(`./posts/store`);
const imagesStore = require(`./images/store`);
const postsRouter = require(`./posts/route`)(postsStore, imagesStore);

const DEFAULT_PORT = 3000;
const MIMIMUM_PORT_VALUE = 2000;

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};
const ERROR_HANDLER = (err, req, res, _next) => {
  if (err) {
    console.error(err);
    res.status(err.code || 500).send(err.message);
  }
};

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
      : DEFAULT_PORT;

  app.listen(port, () =>
    console.log(`Сервер запущен: http://localhost:${port}`)
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
