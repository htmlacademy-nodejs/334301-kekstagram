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

describe(`POST /api/posts`, () => {
  it(`send post as json`, async () => {
    const sent = {
      url: `https://picsum.photos/600/?random`,
      description: `Самая красивая тачка на этой планете`,
      effect: `chrome`,
      hashtags: [`тачка`, `огонь`, `car`, `bmwX5`],
      likes: 300,
      scale: 100,
      date: 1519136255107
    };

    const response = await request(app)
      .post(`/api/posts`)
      .send(sent)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const post = response.body;
    assert.deepEqual(post, sent);
  });

  it(`send post as multipart/form-data`, async () => {
    const postUrl = `https://picsum.photos/600/?random`;
    const postDescription = `Самая красивая тачка на этой планете`;
    const postEffect = `chrome`;
    const postHashtags = [`тачка`, `огонь`, `car`, `bmwX5`];
    const postLikes = 300;
    const postScale = 100;
    const postDate = 1519136255107;

    const response = await request(app)
      .post(`/api/posts`)
      .field(`url`, postUrl)
      .field(`description`, postDescription)
      .field(`effects`, postEffect)
      .field(`hashtags`, postHashtags)
      .field(`likes`, postLikes)
      .field(`scale`, postScale)
      .field(`date`, postDate)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `multipart/form-data`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const newPost = response.body;
    assert.deepEqual(newPost, {
      url: postUrl,
      description: postDescription,
      effects: postEffect,
      hashtags: postHashtags,
      likes: postLikes,
      scale: postScale,
      date: postDate
    });
  });

  it(`send post with image as multipart/form-data`, async () => {
    const postUrl = `https://picsum.photos/600/?random`;
    const postDescription = `Самая красивая тачка на этой планете`;
    const postEffect = `chrome`;
    const postHashtags = [`тачка`, `огонь`, `car`, `bmwX5`];
    const postLikes = 300;
    const postScale = 100;
    const postDate = 1519136255107;

    const response = await request(app)
      .post(`/api/posts`)
      .field(`url`, postUrl)
      .field(`description`, postDescription)
      .field(`effects`, postEffect)
      .field(`hashtags`, postHashtags)
      .field(`likes`, postLikes)
      .field(`scale`, postScale)
      .field(`date`, postDate)
      .attach(`image`, `test/img/mimic.jpg`)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `multipart/form-data`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const post = response.body;
    assert.deepEqual(post, {
      url: postUrl,
      description: postDescription,
      effects: postEffect,
      hashtags: postHashtags,
      likes: `${postLikes}`,
      scale: `${postScale}`,
      date: `${postDate}`,
      image: {
        filename: `mimic.jpg`
      }
    });
  });
});
