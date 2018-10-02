/* global module */
let enabled = false;

const formatters = {
  j(v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return `[UnexpectedJSONParseError]: ${err.message}`;
    }
  }
};

function coerce(val) {
  return val instanceof Error ? val.stack || val.message : val;
}

module.exports = function debug(name) {
  return function(...args) {
    if (!enabled) {
      return false;
    }

    args[0] = `[${name}] ${coerce(args[0])}`;

    // apply any `formatters` transformations
    let index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
      // if we encounter an escaped % then don't increase the array index
      if (match === "%%") {
        return match;
      }
      let matched = match;
      index++;
      const formatter = formatters[format];
      if (typeof formatter === "function") {
        const val = args[index];
        matched = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return matched;
    });

    // this hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    /* eslint-disable no-console */
    return (
      typeof console === "object" &&
      console.log &&
      Function.prototype.apply.call(console.log, console, args)
    );
    /* eslint-enable no-console */
  };
};

module.exports.enable = function enable() {
  enabled = true;
};

module.exports.disable = function disable() {
  enabled = false;
};
