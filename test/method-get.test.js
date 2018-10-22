"use strict";

const assert = require(`assert`);
const request = require(`supertest`);
const express = require(`express`);

const postsStoreMock = require(`./mock/posts-store-mock`);
const imagesStoreMock = require(`./mock/images-store-mock`);
const postsRoute = require(`../src/posts/route`)(
    postsStoreMock,
    imagesStoreMock
);

const app = express();

app.use(`/api/posts`, postsRoute);

describe(`GET /api/posts`, () => {
  it(`get all posts`, async () => {
    const response = await request(app)
      .get(`/api/posts`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const postsNumber = response.body.total;
    assert.equal(postsNumber, 5);
  });

  it(`get all posts?skip=2&limit=20`, async () => {
    const response = await request(app)
      .get(`/api/posts?skip=2&limit=20`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const postsNumber = response.body.total;
    const showedPostsNumber = response.body.data.length;
    const skip = response.body.skip;
    const limit = response.body.limit;

    assert.equal(postsNumber, 5);
    assert.equal(showedPostsNumber, 3);
    assert.equal(skip, 2);
    assert.equal(limit, 20);
  });

  it(`get post with specific date "1539598594"`, async () => {
    const response = await request(app)
      .get(`/api/posts/1539598594`)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const post = response.body;
    assert.strictEqual(post.date, 1539598594);
  });
});
