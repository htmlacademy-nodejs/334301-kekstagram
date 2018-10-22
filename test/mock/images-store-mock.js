"use strict";

class MockImageStore {
  async get() {
    console.log(2);
  }

  async save() {
    console.log(1);
  }
}

module.exports = new MockImageStore();
