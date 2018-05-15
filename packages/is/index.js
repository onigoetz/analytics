var objProto = Object.prototype;
var owns = objProto.hasOwnProperty;
var toStr = objProto.toString;

// segmentio-facade/lib/facade.js
module.exports.date = function (value) {
  return toStr.call(value) === '[object Date]';
}

// segmentio-facade/lib/facade.js
module.exports.number = require('lodash/isNumber')

// load-iframe/index.js
// analytics.js-core/lib/analytics.js
const fnRegex = /^\[object (?:Generator|Async|)Function\]$/;
module.exports.fn = function (value) {
    return toStr.call(value).match(fnRegex) !== null;
}

// @segment/analytics.js-integration/lib/protos.js
// analytics.js-core/lib/analytics.js
module.exports.object = require('lodash/isObject');

// @segment/analytics.js-integration/lib/protos.js
module.exports.array = require('lodash/isArray');

// load-iframe/index.js
// @segment/analytics.js-integration/lib/protos.js
module.exports.string = require('lodash/isString');

module.exports.empty = function (value) {
    var type = toStr.call(value);
    var key;
  
    if (type === '[object Array]' || type === '[object Arguments]' || type === '[object String]') {
      return value.length === 0;
    }
  
    if (type === '[object Object]') {
      for (key in value) {
        if (owns.call(value, key)) {
          return false;
        }
      }
      return true;
    }
  
    return !value;
  }