"use strict";

const MAXIMUM_DESCRIPTION_LENGTH = 140;
const MINIMUM_HASHTAG_LENGTH = 1;
const MAXIMUM_HASHTAG_LENGTH = 20;
const MAXIMUM_HASHTAGS_NUMBER = 5;
const MINIMUM_SCALE = 0;
const MAXIMIM_SCALE = 100;
const POSSIBLE_EFFECTS = [
  `none`,
  `chrome`,
  `sepia`,
  `marvin`,
  `phobos`,
  `heat`
];

const ValidationError = require(`../error/validation-error`);

const validate = (data) => {
  const errors = [];

  if (!data.filename) {
    errors.push(`Field "filename" is required!`);
  }

  if (data.filetype) {
    if (data.filetype !== `image/jpeg` || data.filetype !== `image/png`) {
      errors.push(`Wrong type of file`);
    }
  }

  if (!data.scale) {
    errors.push(`Field name "scale" is required!`);
  } else {
    if (data.scale < MINIMUM_SCALE || data.scale > MAXIMIM_SCALE) {
      errors.push(`Scale is off limits`);
    }
  }

  if (!data.effect) {
    errors.push(`Field name "effect" is required!`);
  } else {
    if (POSSIBLE_EFFECTS.indexOf(data.effect) < 0) {
      errors.push(`Wrong effect`);
    }
  }

  if (!data.date) {
    errors.push(`Field name "date" is required!`);
  }

  if (
    data.description &&
    data.description.length > MAXIMUM_DESCRIPTION_LENGTH
  ) {
    errors.push(`Description has to many symbols`);
  }

  if (data.hashtags) {
    let lengthError = false;
    let symbolError = false;

    const hashtagsArray = data.hashtags.split(` `);

    hashtagsArray.forEach((hashtag) => {
      if (
        hashtag.length < MINIMUM_HASHTAG_LENGTH + 1 ||
        hashtag.length > MAXIMUM_HASHTAG_LENGTH + 1
      ) {
        lengthError = true;
      }

      if (hashtag[0] !== `#`) {
        symbolError = true;
      }
    });

    if (hashtagsArray.length > MAXIMUM_HASHTAGS_NUMBER) {
      errors.push(`More then 5 hashtags`);
    }

    const lowerCaseHashtags = hashtagsArray.map((hashtag) =>
      hashtag.toLowerCase()
    );

    const hasDuplicate = lowerCaseHashtags.some(function (item, idx) {
      return lowerCaseHashtags.indexOf(item) !== idx;
    });

    if (hasDuplicate) {
      errors.push(`Hashtags are not unique`);
    }

    if (lengthError) {
      errors.push(`Some hashtag has wrong length`);
    }

    if (symbolError) {
      errors.push(`Some hashtag has wrong first symbol`);
    }
  }

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  return data;
};

module.exports = validate;
