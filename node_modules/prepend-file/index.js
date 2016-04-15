'use strict';
var fs = require('fs');
var util = require('util');
var tempfile = require('tempfile');

var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and is fairly slow to generate.
  if (DEBUG) {
    var backtrace = new Error();
    return function(err) {
      if (err) {
        backtrace.stack = err.name + ': ' + err.message +
          backtrace.stack.substr(backtrace.name.length);
        err = backtrace;
        throw err;
      }
    };
  }

  return function(err) {
    if (err) {
      throw err; // Forgot a callback but don't know where? Use NODE_DEBUG=fs
    }
  };
}

function maybeCallback(callback) {
  return typeof callback === 'function' ? callback : rethrow();
}

function cutTmp(src, dest, options, callback) {
  fs.createReadStream(src, options)
    .on('error', function(err) {
      callback(err);
    })
    .pipe(fs.createWriteStream(dest, options))
    .on('error', function(err) {
      callback(err);
    })
    .on('finish', function() {
      fs.unlink(src, callback);
    });
}

module.exports = function prependFile(path, data, options) {
  var callback = maybeCallback(arguments[arguments.length - 1]);

  if (typeof options === 'function' || !options) {
    options = {
      encoding: 'utf8',
      mode: 438 /*=0666*/
    };
  } else if (util.isString(options)) {
    options = {
      encoding: options,
      mode: 438
    };
  } else if (!util.isObject(options)) {
    throw new TypeError('Bad arguments');
  }

  var tmp = tempfile();

  var appendOptions = {
    encoding: options.encoding,
    mode: options.mode,
    flags: 'a'
  };

  // a temp file is written even if dist file does not exist. PR welcome for better implementation.
  fs.writeFile(tmp, data, options, function(err) {
    if (err) {
      callback(err);
      return;
    }

    fs.createReadStream(path, options)
      .on('error', function(err) {
        if (err.code === 'ENOENT' /*file does not exist*/) {
          fs.writeFile(path, data, options, function(err) {
            if (err) {
              callback(err);
            } else {
              callback();
            }
          });
        } else {
          callback(err);
        }
      })
      .pipe(fs.createWriteStream(tmp, appendOptions))
      .on('error', function(err) {
        callback(err);
      })
      .on('finish', function() {
        cutTmp(tmp, path, options, callback);
      });
  });
};

module.exports.sync = function sync(path, data, options) {
  if (!options) {
    options = {
      encoding: 'utf8',
      mode: 438 /*=0666*/
    };
  } else if (util.isString(options)) {
    options = {
      encoding: options,
      mode: 438
    };
  } else if (!util.isObject(options)) {
    throw new TypeError('Bad arguments');
  }

  var currentFileData;

  var appendOptions = {
    encoding: options.encoding,
    mode: options.mode,
    flags: 'w'
  };

  try {
    currentFileData = fs.readFileSync(path, options);
  } catch (err) {
    currentFileData = '';
  }

  fs.writeFileSync(path, data + currentFileData, appendOptions);
};
