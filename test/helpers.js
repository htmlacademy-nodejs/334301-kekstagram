"use strict";

const dataGenerator = require(`../src/data-generator`);

const checkURL = (url) => {
  const urlParts = url.split(`/`);
  return urlParts.find(
      (element) => element === `${dataGenerator.PICTURE_SIZE}`
  );
};

const checkScale = (number) => {
  if (number >= 0 && number <= 100) {
    return true;
  }

  return false;
};

const checkEffects = (effect) => {
  if (dataGenerator.effects.indexOf(effect) !== -1) {
    return true;
  }

  return false;
};

const checkHashtagsFirstChar = (hashtags) => {
  let result = true;

  hashtags.split(` `).forEach((hashtag) => {
    if (hashtag[0] !== `#`) {
      result = false;
    }
  });

  return result;
};

const checkHashtagsSpaces = (hashtags) => {
  let result = true;

  hashtags.split(` `).forEach((hashtag) => {
    if (hashtag.split(` `).length > 1) {
      result = false;
    }
  });

  return result;
};

const checkHashtagsLength = (hashtags) => {
  let result = true;

  hashtags.split(` `).forEach((hashtag) => {
    if (hashtag.length > dataGenerator.MAXIMUM_HASHTAG_LENGTH + 1) {
      result = false;
    }
  });

  return result;
};

const checkHashtagsCopies = (hashtags) => {
  const lowerCaseHashtags = hashtags
    .split(` `)
    .map((hashtag) => hashtag.toLowerCase());

  const isDuplicate = lowerCaseHashtags.some(function (item, idx) {
    return lowerCaseHashtags.indexOf(item) !== idx;
  });

  return !isDuplicate;
};

const checkCommentLength = (comments) => {
  let result = true;

  comments.forEach((comment) => {
    if (comment.length > dataGenerator.MAXIMUM_COMMENT_LENGTH) {
      result = false;
    }
  });

  return result;
};

const checkTimestamp = (currentTimestamp) => {
  if (
    currentTimestamp >= Math.floor(Date.now()) - 7 * (24 * 60 * 60 * 1000) &&
    currentTimestamp <= Math.floor(Date.now())
  ) {
    return true;
  }

  return false;
};

module.exports = {
  checkURL,
  checkScale,
  checkEffects,
  checkHashtagsFirstChar,
  checkHashtagsSpaces,
  checkHashtagsCopies,
  checkHashtagsLength,
  checkCommentLength,
  checkTimestamp
};
