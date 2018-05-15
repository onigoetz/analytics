import isArray from "lodash/isArray";
import isFunction from "lodash/isFunction";
import isPlainObject from "lodash/isPlainObject";
import globalQueue from 'global-queue';

import createDebug from "debug";

import onDOMReady from "./domReady";

const debug = createDebug("tagcommander");

function getCookie(a) {
    const result = new RegExp(
        "(?:^|; )" + encodeURIComponent(a) + "=([^;]*)"
    ).exec(document.cookie)
    return result ? unescape(result[1]) : "";
}

/*
 * tagContainer Generator v5
 * Copyright Tag Commander
 * http://www.tagcommander.com/
 * Generated: 2017-08-28 14:32:50 Europe/Paris
 * ---
 * Version	: 1.02
 * IDTC 	: 2
 * IDS		: 3551
 */
/*!compressed by YUI*/
if (typeof tC == "undefined") {
    if (
        typeof document.domain == "undefined" ||
        typeof document.referrer == "undefined"
    ) {
        document = window.document;
    }
    (function (m, k) {
        var j,
            r,
            y = m.document,
            a = m.location,
            e = m.navigator,
            x = m.tC,
            v = m.$,
            H = Array.prototype.push,
            b = Array.prototype.slice,
            u = Array.prototype.indexOf,
            g = Object.prototype.toString,
            i = Object.prototype.hasOwnProperty,
            o = String.prototype.trim,
            c = function (J, K) {
                return new c.fn.init(J, K, j);
            },
            B = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
            q = /\S/,
            t = /\s+/,
            d = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            w = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
            l = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            D = /^[\],:{}\s]*$/,
            z = /(?:^|:|,)(?:\s*\[)+/g,
            G = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            E = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
            I = /^-ms-/,
            p = /-([\da-z])/gi,
            F = function (J, K) {
                return (K + "").toUpperCase();
            },
            f = {};
        c.fn = c.prototype = {
            constructor: c,
            init: function (J, M, P) {
                var L, N, K, O;
                if (!J) {
                    return this;
                }
                if (J.nodeType) {
                    this.context = this[0] = J;
                    this.length = 1;
                    return this;
                }
                if (typeof J === "string") {
                    if (
                        J.charAt(0) === "<" &&
                        J.charAt(J.length - 1) === ">" &&
                        J.length >= 3
                    ) {
                        L = [null, J, null];
                    } else {
                        L = w.exec(J);
                    }
                    if (L && (L[1] || !M)) {
                        if (L[1]) {
                            M = M instanceof c ? M[0] : M;
                            O = M && M.nodeType ? M.ownerDocument || M : y;
                            J = c.parseHTML(L[1], O, true);
                            if (l.test(L[1]) && isPlainObject(M)) {
                                this.attr.call(J, M, true);
                            }
                            return c.merge(this, J);
                        } else {
                            N = y.getElementById(L[2]);
                            if (N && N.parentNode) {
                                if (N.id !== L[2]) {
                                    return P.find(J);
                                }
                                this.length = 1;
                                this[0] = N;
                            }
                            this.context = y;
                            this.selector = J;
                            return this;
                        }
                    } else {
                        if (!M || M.tC) {
                            return (M || P).find(J);
                        } else {
                            return this.constructor(M).find(J);
                        }
                    }
                } else {
                    if (isFunction(J)) {
                        return P.ready(J);
                    }
                }
                if (J.selector !== k) {
                    this.selector = J.selector;
                    this.context = J.context;
                }
                return c.makeArray(J, this);
            },
            each: function (K, J) {
                return c.each(this, K, J);
            },
            ready: function (J) {
                c.ready.promise(J);
                return this;
            }
        };
        c.fn.init.prototype = c.fn;
        c.extend = c.fn.extend = function () {
            var options,
                name,
                src,
                copy,
                copyIsArray,
                clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;

            // Handle a deep copy situation
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                i = 2;
            }
            if (typeof target !== "object" && !isFunction(target)) {
                target = {};
            }

            // Target is self if none is specified
            if (length === i) {
                target = this;
                --i;
            }
            for (; i < length; i++) {
                // Only deal with non-null/undefined values
                if ((options = arguments[i]) != null) {
                    // Extend the base object
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        // Prevent never-ending loop
                        if (target === copy) {
                            continue;
                        }
                        // Recurse if we're merging plain objects or arrays
                        if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && isArray(src) ? src : [];
                            } else {
                                clone = src && isPlainObject(src) ? src : {};
                            }

                            // Never move original objects, clone them
                            target[name] = c.extend(deep, clone, copy);
                        } else {
                            // Don't bring in undefined values
                            if (copy !== k) {
                                target[name] = copy;
                            }
                        }
                    }
                }
            }
            return target;
        };
        c.extend({
            ssl: "https:" == y.location.protocol ? "https://manager." : "http://redirect3551.",
            randOrd: function () {
                return Math.round(Math.random()) - 0.5;
            },
            nodeNames:
            "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            rnocache: /<(?:script|object|embed|option|style)/i,
            rnoshimcache: new RegExp("<(?:" + c.nodeNames + ")[\\s/>]", "i"),
            rchecked: /checked\s*(?:[^=]|=\s*.checked.)/i,
            containersLaunched: {}
        });
        c.extend({
            each: function (O, P, L) {
                var K,
                    M = 0,
                    N = O.length,
                    J = N === k || isFunction(O);
                if (L) {
                    if (J) {
                        for (K in O) {
                            if (P.apply(O[K], L) === false) {
                                break;
                            }
                        }
                    } else {
                        for (; M < N;) {
                            if (P.apply(O[M++], L) === false) {
                                break;
                            }
                        }
                    }
                } else {
                    if (J) {
                        for (K in O) {
                            if (P.call(O[K], K, O[K]) === false) {
                                break;
                            }
                        }
                    } else {
                        for (; M < N;) {
                            if (P.call(O[M], M, O[M++]) === false) {
                                break;
                            }
                        }
                    }
                }
                return O;
            }
        });
        j = c(y);
        var h = {};
        function C(K) {
            var J = (h[K] = {});
            c.each(K.split(t), function (M, L) {
                J[L] = true;
            });
            return J;
        }
        var s = a.hostname,
            n = s.split("."),
            A =
                "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";
        if (n.length < 2 || s.match(A)) {
            c.maindomain = s;
        } else {
            c.maindomain = n[n.length - 2] + "." + n[n.length - 1];
        }
        m.tC = c;
    })(window);
}
tC.extend({
    internalvars: typeof tC.internalvars != "undefined" ? tC.internalvars : {},
    internalFunctions:
    typeof tC.internalFunctions != "undefined" ? tC.internalFunctions : {},
    privacyVersion: "",
    containerVersion: "1.02",
    id_container: "2",
    id_site: "3551",
    generatorVersion: "1.0.0",
    dedup_done: typeof tC.dedup_done != "undefined" ? tC.dedup_done : false
});
tC.extend({
    launchTag: function (e, c, d, a, b) {
        tC.array_launched_tags.push(c);
        tC.array_launched_tags_keys.push(e);
        tC.containersLaunched[a][b].t.push({ id: e, label: c, idTpl: d });
        window.postMessage(
            'TC.EX:{"id":"' +
            e +
            '","idc":"' +
            b +
            '","idt":"' +
            d +
            '","ids":"' +
            a +
            '","lb":"' +
            c.replace(/"/g, '\\"') +
            '"}',
            "*"
        );
    }
});
if (tC.containersLaunched === undefined) {
    tC.containersLaunched = {};
}
if (tC.containersLaunched[3551] === undefined) {
    tC.containersLaunched[3551] = {};
}
tC.containersLaunched[3551][2] = { v: "1.02", t: [] };

tC.extend({
    isCurrentVersion: function () {
        var a = getCookie("tc_mode_test"),
            b = "testModeIncludeReplaceThisByTrue";
        return a != "1" || (a == "1" && b == "true");
    }
});
tC.extend({
    pixelTrack: {
        add: function (a, b) {
            a = a || 0;
            b = b || "img";
            onDOMReady(function () {
                if (b == "iframe") {
                    var c = document.createElement(b);
                    c.src = a;
                    c.width = 1;
                    c.height = 1;
                    c.style.display = "none";
                    document.body.appendChild(c);
                } else {
                    var c = new Image();
                    c.src = a;
                }
            });
        }
    }
});
tC.extend({
    storage: {
        has: function () {
            try {
                if ("localStorage" in window && window.localStorage !== null) {
                    window.localStorage.setItem("TC_CHECK", "1");
                    window.localStorage.removeItem("TC_CHECK");
                    return true;
                }
                return false;
            } catch (a) {
                return false;
            }
        },
        get: function (a) {
            return this.has() ? window.localStorage.getItem(a) : false;
        },
        set: function (b, a) {
            return this.has() ? window.localStorage.setItem(b, a) || true : false;
        },
        remove: function (a) {
            return this.has() ? window.localStorage.removeItem(a) || true : false;
        }
    }
});
tC.extend({
    hitCounter: function () {
        if (Math.floor(Math.random() * parseInt(1000)) == 0) {
            tC.pixelTrack.add(
                "//manager.tagcommander.com/utils/hit.php?id=2&site=3551&version=1.02&frequency=1000&position=" +
                tC.container_position +
                "&rand=" +
                Math.random()
            );
        }
    }
});
tC.container_position =
    typeof tc_container_position !== "undefined"
        ? tc_container_position
        : typeof tC.container_position !== "undefined" ? tC.container_position : 0;
tC.container_position++;
if (typeof tc_container_position !== "undefined") {
    tc_container_position++;
}
tC.hitCounter();
tC.extend({
    script: {
        add: function (d, f, c) {
            var a =
                document.getElementsByTagName("body")[0] ||
                document.getElementsByTagName("script")[0].parentNode,
                b = document.createElement("script");
            b.type = "text/javascript";
            b.async = true;
            b.src = d;
            b.charset = "utf-8";
            if (a) {
                if (f) {
                    if (b.addEventListener) {
                        b.addEventListener(
                            "load",
                            function () {
                                f();
                            },
                            false
                        );
                    } else {
                        b.onreadystatechange = function () {
                            if (b.readyState in { loaded: 1, complete: 1 }) {
                                b.onreadystatechange = null;
                                f();
                            }
                        };
                    }
                }
                if (c && typeof c == "number") {
                    setTimeout(function () {
                        if (a && b.parentNode) {
                            a.removeChild(b);
                        }
                    }, c);
                }
                a.insertBefore(b, a.firstChild);
            } else {
                debug(
                    `tC.script error : the element <script> or <body> is not found ! the file ${d} is not implemented`
                );
            }
        }
    }
});
tC.extend({
    _R: {
        cR: function (a) {
            tC.storage.set("tC_Sync", a);
            tC.pixelTrack.add("//engage.commander1.com/reach?tc_s=3551");
        },
        rR: function () {
            if (tC.storage.has()) {
                var a = new Date().getTime();
                var b = tC.storage.get("tC_Sync") || 0;
                b = parseInt(b);
                if (b == 0 || a - b > 604800000) {
                    this.cR(a);
                }
            }
        }
    }
});
onDOMReady(function () {
    tC._R.rR();
});
//let tC3551_2 = tC; /* RETRO COMPATIBILITY FUNCTIONS */

if (typeof tc_vars == "undefined") var tc_vars = [];
(function () {
    var l = "env_template|page_name".split("|");
    for (var k in l) {
        if (!tc_vars.hasOwnProperty(l[k])) {
            tc_vars[l[k]] = "";
        }
    }
})();

/*DYNAMIC JS BLOCK 1*/

/*END DYNAMIC JS BLOCK 1*/

/*CUSTOM_JS_BLOCK1*/
function tc_events_global(var1, var2, var3) {
    if (typeof tc_events_1 === "function") tc_events_1(var1, var2, var3);
    if (typeof tc_events_2 === "function") tc_events_2(var1, var2, var3);
    if (typeof tc_events_3 === "function") tc_events_3(var1, var2, var3);
    if (typeof tc_events_4 === "function") tc_events_4(var1, var2, var3);
}
/*END_CUSTOM_JS_BLOCK1*/
tC.array_launched_tags = [];
tC.array_launched_tags_keys = [];
tC.id_site = "3551";
//if (getCookie("tc_mode_test") == 1) {
(function () {
    var tc_testmodescriptload = document.createElement("script");
    tc_testmodescriptload.type = "text/javascript";
    tc_testmodescriptload.src =
        "//manager.tagcommander.com/utils/test_mode_include.php?id=2&site=3551&type=load&rand=" +
        Math.random() +
        "&version=";
    (document.getElementsByTagName("body")[0] ||
        document.getElementsByTagName("head")[0] ||
        document.getElementsByTagName("script")[0].parentNode)
        .appendChild(tc_testmodescriptload);
})();
//} else {
/*VARIABLES_BLOCK*/
/*END_VARIABLES_BLOCK*/
/*DYNAMIC JS BLOCK 2*/
/*END DYNAMIC JS BLOCK 2*/
/*CUSTOM_JS_BLOCK2*/
/*END_CUSTOM_JS_BLOCK2*/
//}

//----------------------------------------------------

//----

//if (getCookie("tc_mode_test") == 1) {
// Is the same generated content ?!?
/*(function () {
    var tc_testmodescriptexec = document.createElement("script");
    tc_testmodescriptexec.type = "text/javascript";
    tc_testmodescriptexec.src =
        "//manager.tagcommander.com/utils/test_mode_include.php?id=2&site=3551&type=exec&rand=" +
        Math.random() +
        "&version=1.02";
    (document.getElementsByTagName("body")[0] ||
        document.getElementsByTagName("head")[0] ||
        document.getElementsByTagName("script")[0].parentNode)
        .appendChild(tc_testmodescriptexec);
})();*/
// Bookmarklet
/*(function () {
    setTimeout(function () {
        if (typeof top.tc_count !== "undefined") {
            top.tc_count++;
        } else {
            top.tc_count = 1;
        }
        var tc_newscript = document.createElement("script");
        tc_newscript.type = "text/javascript";
        tc_newscript.src =
            "//manager.tagcommander.com/utils/livetest/bookmarklet.php?r=" +
            Math.random() +
            "&nb=" +
            top.tc_count +
            "&container=3551!2&version=1.02";
        (document.getElementsByTagName("body")[0] ||
            document.getElementsByTagName("head")[0] ||
            document.getElementsByTagName("script")[0].parentNode)
            .appendChild(tc_newscript);
    }, 1000);
})();*/
//} else {
//    tC.launchTag("2", "Free input (custom)", "26", "3551", "2");
//}
function tc_events_2(tc_elt, tc_id_event, tc_array_events) {
    tc_array_events["id"] = tc_id_event;
    (function () {
        var l = "id".split("|");
        for (var k in l) {
            if (!tc_array_events.hasOwnProperty(l[k])) {
                tc_array_events[l[k]] = "";
            }
        }
    })();
    if (tc_array_events["id"] == "open-forex-demo-account") {
        tC.launchTag(
            "eopen-forex-demo-account",
            "Open forex demo",
            "-1",
            "3551",
            "2"
        );
        tC.log("open_demo");
    }
}


analytics.use(() => {

    /**
     * Expose `GTM`.
     */

    var TagCo = analytics.integration('Tag Commander')
        .global('dataLayer')
        .global('google_tag_manager')
        .option('containerId', '')
        .option('siteId', '')
        .option('environment', '')
        .option('trackNamedPages', true)
        .option('trackCategorizedPages', true)
        .tag('no-env', '<script src="//www.googletagmanager.com/gtm.js?id={{ containerId }}&l=dataLayer">')
        .tag('with-env', '<script src="//www.googletagmanager.com/gtm.js?id={{ containerId }}&l=dataLayer&gtm_preview={{ environment }}">');

    /**
     * Initialize.
     *
     * https://developers.google.com/tag-manager
     *
     * @api public
     */

    TagCo.prototype.initialize = function () {

    };

    /**
     * Loaded?
     *
     * @api private
     * @return {boolean}
     */

    TagCo.prototype.loaded = function () {
        return true;
        //return !!(window.dataLayer && Array.prototype.push !== window.dataLayer.push);
    };

    /**
     * Page.
     *
     * @api public
     * @param {Page} page
     */

    TagCo.prototype.page = function (page) {
        /*var category = page.category();
        var name = page.fullName();
        var opts = this.options;
      
        // all
        if (opts.trackAllPages) {
          this.track(page.track());
        }
      
        // categorized
        if (category && opts.trackCategorizedPages) {
          this.track(page.track(category));
        }
      
        // named
        if (name && opts.trackNamedPages) {
          this.track(page.track(name));
        }*/
    };

    /**
     * Track.
     *
     * https://developers.google.com/tag-manager/devguide#events
     *
     * @api public
     * @param {Track} track
     */

    TagCo.prototype.track = function (track) {
        /*var props = track.properties();
        var userId = this.analytics.user().id();
        var anonymousId = this.analytics.user().anonymousId();
        if (userId) props.userId = userId;
        if (anonymousId) props.segmentAnonymousId = anonymousId;
        props.event = track.event();
      
        push(props);*/
    };

    return TagCo;

})