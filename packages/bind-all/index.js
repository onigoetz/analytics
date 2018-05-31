/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj The object to bind to
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */
function bind(obj, fn, ...args) {
  return function(...innerArgs) {
    return fn.apply(obj, args.concat(innerArgs));
  };
}

export default function bindAll(obj) {
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    const val = obj[key];
    if (typeof val === "function") {
      obj[key] = bind(obj, obj[key]);
    }
  }
  return obj;
}
