/**
 * Module dependencies.
 */

import cookie from "component-cookie";

/**
 * Levels returns all levels of the given url.
 *
 * @param {string} url The URL to get the levels from
 * @return {Array}
 * @api public
 */
function getLevels(url) {
  const a = document.createElement("a");
  a.href = url;

  const host = a.hostname || location.hostname;
  const parts = host.split(".");
  const last = parts[parts.length - 1];
  const levels = [];

  // Ip address.
  if (parts.length === 4 && last === parseInt(last, 10)) {
    return levels;
  }

  // Localhost.
  if (parts.length <= 1) {
    return levels;
  }

  // Create levels.
  for (let i = parts.length - 2; i >= 0; --i) {
    levels.push(parts.slice(i).join("."));
  }

  return levels;
}

/**
 * Get the top domain.
 *
 * The function constructs the levels of domain and attempts to set a global
 * cookie on each one when it succeeds it returns the top level domain.
 *
 * The method returns an empty string when the hostname is an ip or `localhost`.
 *
 * Example levels:
 *
 *      domain.levels('http://www.google.co.uk');
 *      // => ["co.uk", "google.co.uk", "www.google.co.uk"]
 *
 * Example:
 *
 *      domain('http://localhost:3000/baz');
 *      // => ''
 *      domain('http://dev:3000/baz');
 *      // => ''
 *      domain('http://127.0.0.1:3000/baz');
 *      // => ''
 *      domain('http://segment.io/baz');
 *      // => 'segment.io'
 *
 * @param {string} url The URL to find the top domain from
 * @return {string}
 * @api public
 */
export default function domain(url) {
  const levels = getLevels(url);

  // Lookup the real top level one.
  for (let i = 0; i < levels.length; ++i) {
    const cname = "__tld__";
    const dom = levels[i];
    const opts = { domain: `.${dom}` };

    cookie.set(cname, 1, opts);
    if (cookie.get(cname)) {
      cookie.remove(cname, opts);
      return dom;
    }
  }

  return "";
}
