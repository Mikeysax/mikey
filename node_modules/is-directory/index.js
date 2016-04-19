/*!
 * is-directory <https://github.com/jonschlinkert/is-directory>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');

/**
 * Expose `isDir`
 */

module.exports = isDir;

/**
 * async
 */

function isDir(fp, cb) {
  if (typeof fp !== 'string') {
    throw new Error('is-directory async expects filepath to be a string.');
  }

  if (typeof cb !== 'function') {
    throw new Error('is-directory async expects a callback function.');
  }

  fs.stat(fp, function(err, stats) {
    if (err) return cb(err);
    cb(null, stats.isDirectory());
    return;
  });
}

/**
 * sync
 */

isDir.sync = function isDirSync(fp) {
  if (typeof fp !== 'string') {
    throw new Error('is-directory sync expects filepath to be a string.');
  }
  try {
    return fs.statSync(fp).isDirectory();
  } catch(err) {}
  return false;
};
