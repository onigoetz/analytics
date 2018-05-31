/**
 * Module dependencies.
 */

import debug from "debug";

/**
 * Generate a global queue pushing method with `name`.
 *
 * @param {String} name
 * @param {Object} options
 *   @property {Boolean} wrap
 * @return {Function}
 */

export default function generate(name, options = {}) {
  const log = debug(`global-queue:${name}`);

  return function(...args) {
    if (!window[name]) {
      window[name] = [];
    }

    log("%o", args);
    if (options.wrap === false) {
      window[name].push(...args);
    } else {
      window[name].push(args);
    }
  };
}
