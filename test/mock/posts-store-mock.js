"use strict";

const Cursor = require(`./cursor-mock`);
const dataGenerator = require(`../../src/data-generator`);

class PostsStoreMock {
  constructor(data) {
    this.data = data;
  }

  async getPost(date) {
    return this.data.filter(
        (it) => parseInt(it.date, 10) === parseInt(date, 10)
    )[0];
  }

  async getAllPosts() {
    return new Cursor(this.data);
  }

  async save() {
    return {
      insertedId: 42
    };
  }
}

module.exports = () =>
  new PostsStoreMock(
      (() => {
        const posts = [];
        posts.push(dataGenerator.generateSpecificEntity());
        posts.push(dataGenerator.generateEntity());
        posts.push(dataGenerator.generateEntity());
        posts.push(dataGenerator.generateEntity());
        posts.push(dataGenerator.generateEntity());

        return posts;
      })()
  );
