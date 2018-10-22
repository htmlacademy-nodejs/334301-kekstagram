"use strict";

const ValidationError = require(`../error/validation-error`);

const validate = (data) => {
  const errors = [];

  if (!data.url) {
    errors.push(`Field name "url" is required!`);
  }

  if (!data.scale) {
    errors.push(`Field name "scale" is required!`);
  }

  if (!data.hashtags) {
    errors.push(`Field name "hashtags" is required!`);
  }

  if (!data.description) {
    errors.push(`Field name "description" is required!`);
  }

  if (!data.date) {
    errors.push(`Field name "date" is required!`);
  }

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  return data;
};

module.exports = validate;
