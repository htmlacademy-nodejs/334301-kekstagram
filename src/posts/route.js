"use strict";

const express = require(`express`);
const multer = require(`multer`);
const toStream = require(`buffer-to-stream`);
const validate = require(`./validate`);
const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);

const DEFAULT_SKIP = 0;
const DEFAULT_LIMIT = 50;

// eslint-disable-next-line new-cap
const postsRouter = express.Router();
const upload = multer({storage: multer.memoryStorage()});
const jsonParser = express.json();

const asyncMiddleware = (fn) => (req, res, next) =>
  fn(req, res, next).catch(next);

const toPage = async (cursor, skip = 0, limit = DEFAULT_LIMIT) => {
  const packet = await cursor
    .skip(skip)
    .limit(limit)
    .toArray();

  return {
    data: packet,
    skip,
    limit,
    total: await cursor.count()
  };
};

postsRouter.get(
    ``,
    asyncMiddleware(async (req, res) => {
      const skip = parseInt(req.query.skip, 10);
      const limit = parseInt(req.query.limit, 10);
      if ((skip && skip < DEFAULT_SKIP) || (limit && limit > DEFAULT_LIMIT)) {
        throw new IllegalArgumentError(
            `Неверное значение параметра "skip" или "limit"`
        );
      }

      res.send(
          await toPage(await postsRouter.postsStore.getAllPosts(), skip, limit)
      );
    })
);

postsRouter.get(
    `/:date`,
    asyncMiddleware(async (req, res) => {
      const postDate = req.params.date;
      if (!postDate) {
        throw new IllegalArgumentError(`В запросе не указана временная метка`);
      }

      const found = await postsRouter.postsStore.getPost(postDate);
      if (!found) {
        throw new NotFoundError(
            `Пост с временной меткой "${postDate}" не найден`
        );
      }

      res.send(found);
    })
);

postsRouter.post(
    ``,
    jsonParser,
    upload.single(`image`),
    asyncMiddleware(async (req, res) => {
      const body = req.body;
      const image = req.file;
      if (image) {
        body.image = {filename: image.originalname};
      }

      const result = await postsRouter.postsStore.save(validate(body));
      const insertedId = result.insertedId;

      if (image) {
        await postsRouter.imagesStore.save(insertedId, toStream(image.buffer));
      }

      res.send(validate(body));
    })
);

postsRouter.get(
    `/:date/image`,
    asyncMiddleware(async (req, res) => {
      const postDate = req.params.date;
      if (!postDate) {
        throw new IllegalArgumentError(`В запросе не указана временная метка`);
      }

      const found = await postsRouter.postsStore.getPost(postDate);
      if (!found) {
        throw new NotFoundError(
            `Пост с временной меткой "${postDate}" не найден`
        );
      }

      const result = await postsRouter.imagesStore.get(found._id);
      if (!result) {
        throw new NotFoundError(
            `Изображение для поста с временной меткой "${postDate}" не найдено`
        );
      }

      res.header(`Content-Type`, `image/jpg`);
      res.header(`Content-Length`, result.info.length);

      res.on(`error`, (e) => console.error(e));
      res.on(`end`, () => res.end());
      const stream = result.stream;
      stream.on(`error`, (e) => console.error(e));
      stream.on(`end`, () => res.end());
      stream.pipe(res);
    })
);

module.exports = (postsStore, imagesStore) => {
  postsRouter.postsStore = postsStore;
  postsRouter.imagesStore = imagesStore;
  return postsRouter;
};
