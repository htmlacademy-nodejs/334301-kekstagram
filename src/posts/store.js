"use strict";

const db = require(`../database/db`);
const logger = require(`../logger`);

const setupCollection = async () => {
  const dBase = await db.connectToDatabase();

  const collection = dBase.collection(`posts`);
  collection.createIndex({date: -1}, {unique: true});
  return collection;
};

class PostsStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getPost(someDate) {
    return (await this.collection).findOne({date: parseInt(someDate, 10)});
  }

  async getAllPosts() {
    return (await this.collection).find();
  }

  async save(postData) {
    return (await this.collection).insertOne(postData);
  }
}

module.exports = new PostsStore(
    setupCollection().catch((e) =>
      logger.error(`Failed to set up "posts"-collection`, e)
    )
);
