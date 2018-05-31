/**
 * Test whether a string is camel-case.
 */

const hasSpace = /\s/;
const hasSeparator = /[\W_]/;

/**
 * Separator splitter.
 */

const separatorSplitter = /[\W_]+(.|$)/g;

/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate(string) {
  return string.replace(separatorSplitter, (m, next) => {
    return next ? ` ${next}` : "";
  });
}

/**
 * Camelcase splitter.
 */

const camelSplitter = /(.)([A-Z]+)/g;

/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize(string) {
  return string.replace(camelSplitter, (m, previous, uppers) => {
    return `${previous} ${uppers
      .toLowerCase()
      .split("")
      .join(" ")}`;
  });
}

/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

export default function toNoCase(string) {
  if (hasSpace.test(string)) {
    return string.toLowerCase();
  }
  if (hasSeparator.test(string)) {
    return (unseparate(string) || string).toLowerCase();
  }
  return uncamelize(string).toLowerCase();
}
