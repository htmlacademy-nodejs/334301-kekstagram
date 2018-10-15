'use strict';

const assert = require(`assert`);
const request = require(`supertest`);
const app = require(`../src/server`).app;

describe(`GET /api/posts`, () => {
  it(`get all posts`, async () => {

    const response = await request(app).
      get(`/api/posts`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const posts = response.body;
    assert.equal(posts.length, 10);
  });

  it(`trying to reach unknown resource`, async () => {
    return await request(app).
    get(`/api/dead`).
    set(`Accept`, `application/json`).
    expect(404).
    expect(`Page was not found`).
    expect(`Content-Type`, /html/);
  });
});

describe(`GET /api/posts/:date`, () => {
  it(`have posts with specific timestamp`, async () => {
    const response = await request(app).
      get(`/api/posts/1539598594`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const posts = response.body;
    let isCorrect = true;

    posts.forEach((post) => {
      if (post.date !== 1539598594) {
        isCorrect = false;
      }
    });

    assert.equal(isCorrect, true);
  });
});
