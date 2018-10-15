'use strict';

const MAXIMUM_TEXT_LENGTH = 140;
const MAXIMUM_HASHTAG_LENGTH = 20;
const MAXIMUM_HASHTAGS_NUMBER = 5;
const MAXIMUM_LIKES_NUMBER = 1000;
const MAXIMUM_COMMENT_LENGTH = 140;
const COMMENTS_NUMBER = 5;
const PICTURE_SIZE = 600;
const SPECIFIC_DATE = 1539598594;

const effects = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];

const getRandomInt = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

const generateRandomText = (maximumTextLength) => {
  const possibleChars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

  let text = ``;
  const textLength = getRandomInt(1, maximumTextLength);

  for (let i = 0; i < textLength; i++) {
    text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }

  return text;
};

const generateRandomHashtags = () => {
  const hashtagsNumber = getRandomInt(1, MAXIMUM_HASHTAGS_NUMBER);

  const newHashTags = [];

  for (let i = 0; i < hashtagsNumber; i++) {
    let hashtag = `#` + generateRandomText(MAXIMUM_HASHTAG_LENGTH);

    newHashTags.push(hashtag);
  }

  return newHashTags;
};

const generateRandomComments = () => {
  const commentsNumber = getRandomInt(1, COMMENTS_NUMBER);

  const newComments = [];

  for (let i = 0; i < commentsNumber; i++) {
    let comment = generateRandomText(MAXIMUM_COMMENT_LENGTH);

    newComments.push(comment);
  }

  return newComments;
};

const generateRandomTimeStamp = () => {
  const offset = getRandomInt(0, (7 * 24 * 60 * 60 * 1000));

  const newTimestamp = Math.floor(Date.now()) - offset;

  return newTimestamp;
};

const generateEntity = () => {
  return ({
    "url": `https://picsum.photos/600/?random`,
    "scale": getRandomInt(0, 100),
    "effect": effects[getRandomInt(0, (effects.length - 1))],
    "hashtags": generateRandomHashtags(),
    "description": generateRandomText(MAXIMUM_TEXT_LENGTH),
    "likes": getRandomInt(0, MAXIMUM_LIKES_NUMBER),
    "comments": generateRandomComments(),
    "date": generateRandomTimeStamp()
  });
};

const generateSpecificEntity = () => {
  const specificEntity = generateEntity();
  specificEntity.date = SPECIFIC_DATE;

  return specificEntity;
};


module.exports = {
  generateEntity,
  generateSpecificEntity,
  effects,
  MAXIMUM_TEXT_LENGTH,
  MAXIMUM_HASHTAG_LENGTH,
  MAXIMUM_HASHTAGS_NUMBER,
  MAXIMUM_LIKES_NUMBER,
  MAXIMUM_COMMENT_LENGTH,
  PICTURE_SIZE
};
