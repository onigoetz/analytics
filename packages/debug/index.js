var enabled = false;

const formatters = {
    j: function (v) {
        try {
            return JSON.stringify(v);
        } catch (err) {
            return '[UnexpectedJSONParseError]: ' + err.message;
        }
    }
}

function coerce(val) {
    return (val instanceof Error) ? val.stack || val.message : val;
}

module.exports = function debug(name) {
    return function () {
        if (!enabled) return;

        // turn the `arguments` into a proper Array
        var args = new Array(arguments.length);
        for (var i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
        }

        args[0] = `[${name}] ${coerce(args[0])}`;

        // apply any `formatters` transformations
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
            // if we encounter an escaped % then don't increase the array index
            if (match === '%%') return match;
            index++;
            var formatter = formatters[format];
            if ('function' === typeof formatter) {
                var val = args[index];
                match = formatter.call(self, val);

                // now we need to remove `args[index]` since it's inlined in the `format`
                args.splice(index, 1);
                index--;
            }
            return match;
        });

        // this hackery is required for IE8/9, where
        // the `console.log` function doesn't have 'apply'
        return typeof console === 'object'
            && console.log
            && Function.prototype.apply.call(console.log, console, args);
    };
}

module.exports.enable = function () { enabled = true };
module.exports.disable = function () { enabled = false };