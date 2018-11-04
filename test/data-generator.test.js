"use strict";

const assert = require(`assert`);
const helpers = require(`./helpers`);
const dataGenerator = require(`../src/data-generator`);

describe(`Data Generator`, () => {
  it(`should have a generateEntity method`, () => {
    assert.equal(typeof dataGenerator, `object`);
    assert.equal(typeof dataGenerator.generateEntity, `function`);
  });

  it(`generateEntity method should return object`, () => {
    assert.equal(typeof dataGenerator.generateEntity(), `object`);
  });

  it(`generateEntity method data should have all fields`, () => {
    const newObject = dataGenerator.generateEntity();

    assert.equal(typeof newObject.url, `string`);
    assert.equal(typeof newObject.scale, `number`);
    assert.equal(typeof newObject.effect, `string`);
    assert.equal(typeof newObject.hashtags, `string`);
    assert.equal(typeof newObject.description, `string`);
    assert.equal(typeof newObject.likes, `number`);
    assert.equal(typeof newObject.comments, `object`);
    assert.equal(typeof newObject.date, `number`);
    assert.equal(typeof newObject.filename, `string`);
  });

  describe(`URL field`, () => {
    it(`contains address to ${dataGenerator.PICTURE_SIZE} picture size`, () => {
      assert.equal(
          helpers.checkURL(dataGenerator.generateEntity().url),
          dataGenerator.PICTURE_SIZE
      );
    });
  });

  describe(`Scale field`, () => {
    it(`contains number from 0 to 100`, () => {
      assert.equal(
          helpers.checkScale(dataGenerator.generateEntity().scale),
          true
      );
      assert.equal(
          helpers.checkScale(dataGenerator.generateEntity().scale),
          true
      );
      assert.equal(
          helpers.checkScale(dataGenerator.generateEntity().scale),
          true
      );
      assert.equal(
          helpers.checkScale(dataGenerator.generateEntity().scale),
          true
      );
    });
  });

  describe(`Effect field`, () => {
    it(`contains one of possible effects`, () => {
      assert.equal(
          helpers.checkEffects(dataGenerator.generateEntity().effect),
          true
      );
      assert.equal(
          helpers.checkEffects(dataGenerator.generateEntity().effect),
          true
      );
      assert.equal(
          helpers.checkEffects(dataGenerator.generateEntity().effect),
          true
      );
      assert.equal(
          helpers.checkEffects(dataGenerator.generateEntity().effect),
          true
      );
    });
  });

  describe(`Hashtag field`, () => {
    it(`has maximum ${dataGenerator.MAXIMUM_HASHTAGS_NUMBER} elements`, () => {
      assert.equal(
          dataGenerator.generateEntity().hashtags.split(` `).length <=
          dataGenerator.MAXIMUM_HASHTAGS_NUMBER,
          true
      );
      assert.equal(
          dataGenerator.generateEntity().hashtags.split(` `).length <=
          dataGenerator.MAXIMUM_HASHTAGS_NUMBER,
          true
      );
      assert.equal(
          dataGenerator.generateEntity().hashtags.split(` `).length <=
          dataGenerator.MAXIMUM_HASHTAGS_NUMBER,
          true
      );
      assert.equal(
          dataGenerator.generateEntity().hashtags.split(` `).length <=
          dataGenerator.MAXIMUM_HASHTAGS_NUMBER,
          true
      );
    });

    it(`begins with #`, () => {
      assert.equal(
          helpers.checkHashtagsFirstChar(dataGenerator.generateEntity().hashtags),
          true
      );
      assert.equal(
          helpers.checkHashtagsFirstChar(dataGenerator.generateEntity().hashtags),
          true
      );
      assert.equal(
          helpers.checkHashtagsFirstChar(dataGenerator.generateEntity().hashtags),
          true
      );
    });

    it(`doesn't contain spaces in single hashtag`, () => {
      assert.equal(
          helpers.checkHashtagsSpaces(dataGenerator.generateEntity().hashtags),
          true
      );
      assert.equal(
          helpers.checkHashtagsSpaces(dataGenerator.generateEntity().hashtags),
          true
      );
      assert.equal(
          helpers.checkHashtagsSpaces(dataGenerator.generateEntity().hashtags),
          true
      );
    });

    it(`doesn't contain items with more then ${
      dataGenerator.MAXIMUM_HASHTAG_LENGTH
    } symbols`, () => {
      assert.equal(
          helpers.checkHashtagsLength(dataGenerator.generateEntity().hashtags),
          true
      );
      assert.equal(
          helpers.checkHashtagsLength(dataGenerator.generateEntity().hashtags),
          true
      );
      assert.equal(
          helpers.checkHashtagsLength(dataGenerator.generateEntity().hashtags),
          true
      );
    });

    it(`has unique items`, () => {
      assert.equal(
          helpers.checkHashtagsCopies(dataGenerator.generateEntity().hashtags),
          true
      );
      assert.equal(
          helpers.checkHashtagsCopies(dataGenerator.generateEntity().hashtags),
          true
      );
      assert.equal(
          helpers.checkHashtagsCopies(dataGenerator.generateEntity().hashtags),
          true
      );
      assert.equal(
          helpers.checkHashtagsCopies(dataGenerator.generateEntity().hashtags),
          true
      );
    });
  });

  describe(`Description field`, () => {
    it(`length less then ${dataGenerator.MAXIMUM_TEXT_LENGTH}`, () => {
      assert.equal(
          dataGenerator.generateEntity().description.length <=
          dataGenerator.MAXIMUM_TEXT_LENGTH,
          true
      );
      assert.equal(
          dataGenerator.generateEntity().description.length <=
          dataGenerator.MAXIMUM_TEXT_LENGTH,
          true
      );
      assert.equal(
          dataGenerator.generateEntity().description.length <=
          dataGenerator.MAXIMUM_TEXT_LENGTH,
          true
      );
      assert.equal(
          dataGenerator.generateEntity().description.length <=
          dataGenerator.MAXIMUM_TEXT_LENGTH,
          true
      );
    });
  });

  describe(`Likes field`, () => {
    it(`maximum value is ${dataGenerator.MAXIMUM_LIKES_NUMBER}`, () => {
      assert.equal(
          dataGenerator.generateEntity().likes <=
          dataGenerator.MAXIMUM_LIKES_NUMBER,
          true
      );
      assert.equal(
          dataGenerator.generateEntity().likes <=
          dataGenerator.MAXIMUM_LIKES_NUMBER,
          true
      );
      assert.equal(
          dataGenerator.generateEntity().likes <=
          dataGenerator.MAXIMUM_LIKES_NUMBER,
          true
      );
      assert.equal(
          dataGenerator.generateEntity().likes <=
          dataGenerator.MAXIMUM_LIKES_NUMBER,
          true
      );
    });
  });

  describe(`Comments field`, () => {
    it(`maximum comment length is ${
      dataGenerator.MAXIMUM_COMMENT_LENGTH
    }`, () => {
      assert.equal(
          helpers.checkCommentLength(dataGenerator.generateEntity().comments),
          true
      );
      assert.equal(
          helpers.checkCommentLength(dataGenerator.generateEntity().comments),
          true
      );
      assert.equal(
          helpers.checkCommentLength(dataGenerator.generateEntity().comments),
          true
      );
      assert.equal(
          helpers.checkCommentLength(dataGenerator.generateEntity().comments),
          true
      );
      assert.equal(
          helpers.checkCommentLength(dataGenerator.generateEntity().comments),
          true
      );
    });
  });

  describe(`Date field`, () => {
    it(`returns UNIX timestamp from one of last 7 days`, () => {
      assert.equal(
          helpers.checkTimestamp(dataGenerator.generateEntity().date),
          true
      );
      assert.equal(
          helpers.checkTimestamp(dataGenerator.generateEntity().date),
          true
      );
      assert.equal(
          helpers.checkTimestamp(dataGenerator.generateEntity().date),
          true
      );
      assert.equal(
          helpers.checkTimestamp(dataGenerator.generateEntity().date),
          true
      );
    });
  });
});
