'use strict';

const express = require(`express`);
const dataGenerator = require(`../data-generator`);
const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const multer = require(`multer`);

const DEFAULT_SKIP = 0;
const DEFAULT_LIMIT = 50;
const TEST_POSTS_NUMBER = 10;

// eslint-disable-next-line new-cap
const postsRouter = express.Router();
const upload = multer({storage: multer.memoryStorage()});
const jsonParser = express.json();

class Response {
  constructor(recievedPosts, skip, limit) {
    this.recievedPosts = recievedPosts;
    this.skip = skip;
    this.limit = limit;
    this.total = recievedPosts.length;

    this.formAnswer = this.formAnswer.bind(this);
  }

  formAnswer() {
    return {
      data: this.recievedPosts,
      skip: this.skip,
      limit: this.limit,
      total: this.total
    };
  }
}

const posts = [];
for (let i = 0; i < TEST_POSTS_NUMBER - 1; i++) {
  posts.push(dataGenerator.generateEntity());
}

posts.push(dataGenerator.generateSpecificEntity());

postsRouter.get(``, (req, res) => {
  if (posts.length > DEFAULT_LIMIT) {
    posts.splice(DEFAULT_LIMIT);
  }

  const response = new Response(posts, DEFAULT_SKIP, DEFAULT_LIMIT);
  res.send(response.formAnswer());
});

postsRouter.get(`/:date`, (req, res) => {
  const queryParams = req.query;
  const searchableDate = req.params.date;
  let postsSkip = DEFAULT_SKIP;
  let postsLimit = DEFAULT_LIMIT;

  if (!parseInt(searchableDate, 10)) {
    throw new IllegalArgumentError(`Не верный формат даты`);
  }

  const specificPosts = posts.filter((post) => post.date === parseInt(searchableDate, 10));

  if (!specificPosts || specificPosts.length === 0) {
    throw new NotFoundError(`Посты с датой ${searchableDate} не найдены`);
  }

  if (queryParams.skip && parseInt(queryParams.skip, 10) && queryParams.skip > 0) {
    postsSkip = queryParams.skip;
  }

  if (queryParams.limit && parseInt(queryParams.limit, 10) && queryParams.limit > 0) {
    postsLimit = queryParams.limit;
  }

  if (specificPosts.length > postsLimit) {
    specificPosts.splice(postsLimit);
  }

  if (postsSkip && specificPosts.length > postsSkip) {
    specificPosts.slice(postsSkip);
  }

  const response = new Response(specificPosts, postsSkip, postsLimit);

  res.send(response.formAnswer());
});

postsRouter.post(``, jsonParser, upload.single(`image`), (req, res) => {
  const image = req.file;
  const body = req.body;

  if (image) {
    body.image = {title: image.originalname};
  }

  res.send(body);
});

module.exports = postsRouter;
