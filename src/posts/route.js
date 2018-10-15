'use strict';

const express = require(`express`);
const dataGenerator = require(`../data-generator`);
const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);

const TEST_POSTS_NUMBER = 10;
// eslint-disable-next-line new-cap
const postsRouter = express.Router();

const posts = [];
for (let i = 0; i < TEST_POSTS_NUMBER - 1; i++) {
  posts.push(dataGenerator.generateEntity());
}
posts.push(dataGenerator.generateSpecificEntity());

postsRouter.get(``, (req, res) => {
  res.send(posts);
});

postsRouter.get(`/:date`, (req, res) => {
  const searchableDate = req.params.date;

  if (!parseInt(searchableDate, 10)) {
    throw new IllegalArgumentError(`Не верный формат даты`);
  }

  const specificPosts = posts.filter((post) => post.date === parseInt(searchableDate, 10));

  if (!specificPosts || specificPosts.length === 0) {
    throw new NotFoundError(`Посты с датой ${searchableDate} не найдены`);
  }

  res.send(specificPosts);
});

module.exports = postsRouter;
