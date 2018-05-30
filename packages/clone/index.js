

import { array as isArray, date as isDate, object as isObject, regex as isRegex } from "is";

export default function clone(obj) {
    if (isObject(obj)) {
        var copy = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = clone(obj[key]);
            }
        }
        return copy;
    }

    if (isArray(obj)) {
        var copy = new Array(obj.length);
        for (var i = 0, l = obj.length; i < l; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    if (isRegex(obj)) {
        return new RegExp(obj.source, ((obj.global ? 'g' : '') + (obj.ignoreCase ? 'i' : '') + (obj.multiline ? 'm' : '')));
    }

    if (isDate(obj)) {
        return new Date(obj.getTime());
    }

    // string, number, boolean, etc.
    return obj;
}
