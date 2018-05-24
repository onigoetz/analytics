/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

function bind(obj, fn){
  var args = slice.call(arguments, 2);
  return function() {
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
}

export default function bindAll(obj) {
    // eslint-disable-next-line guard-for-in
    for (var key in obj) {
      var val = obj[key];
      if (typeof val === 'function') {
        obj[key] = bind(obj, obj[key]);
      }
    }
    return obj;
  }
  