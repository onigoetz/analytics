import {
  array as isArray,
  date as isDate,
  object as isObject,
  regex as isRegex
} from "is";

function cloneRegex(obj) {
  return new RegExp(
    obj.source,
    (obj.global ? "g" : "") +
      (obj.ignoreCase ? "i" : "") +
      (obj.multiline ? "m" : "")
  );
}

export default function clone(obj) {
  if (isObject(obj) || isArray(obj)) {
    const copy = isArray(obj) ? [] : {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = clone(obj[key]);
      }
    }
    return copy;
  }

  if (isRegex(obj)) {
    return cloneRegex(obj);
  }

  if (isDate(obj)) {
    return new Date(obj.getTime());
  }

  // string, number, boolean, etc.
  return obj;
}
