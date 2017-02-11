'use strict';

const path = require('path');

module.exports = {
  entry: {
    main: './js/app.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'assets/js')
  }
};
