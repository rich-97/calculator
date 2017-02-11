'use strict';

module.exports = {
  count: function (string, char) {
    let count = 0;

    for (let i of string) {
      if (char === i) {
        count++;
      }
    }

    return count;
  },
  reverse: function (string) {
    let last = string.length - 1;
    let temp = '';

    for (let i = last; i >= 0; i--) {
      temp += string[i];
    }

    return temp;
  }
};
