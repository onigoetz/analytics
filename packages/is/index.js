const objProto = Object.prototype;
const owns = objProto.hasOwnProperty;
const toStr = objProto.toString;

// segmentio-facade/lib/facade.js
export function date(value) {
  return toStr.call(value) === "[object Date]";
}

// segmentio-facade/lib/facade.js
export function number(obj) {
  return typeof obj === "number";
}

export function regex(value) {
  return toStr.call(value) === "[object RegExp]";
}

// load-iframe/index.js
// analytics.js-core/lib/analytics.js
const fnRegex = /^\[object (?:Generator|Async|)Function\]$/;
export function fn(value) {
  return toStr.call(value).match(fnRegex) !== null;
}

// @segment/analytics.js-integration/lib/protos.js
// analytics.js-core/lib/analytics.js
export function object(value) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}

// @segment/analytics.js-integration/lib/protos.js
export const array =
  Array.isArray ||
  function(obj) {
    return toStr.call(obj) === "[object Array]";
  };

// load-iframe/index.js
// @segment/analytics.js-integration/lib/protos.js
export function string(value) {
  return typeof value === "string";
}

export function empty(value) {
  const type = toStr.call(value);

  if (
    type === "[object Array]" ||
    type === "[object Arguments]" ||
    type === "[object String]"
  ) {
    return value.length === 0;
  }

  if (type === "[object Object]") {
    for (const key in value) {
      if (owns.call(value, key)) {
        return false;
      }
    }
    return true;
  }

  return !value;
}
