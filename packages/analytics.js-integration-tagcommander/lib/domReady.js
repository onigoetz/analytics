const fns = []
    , doc = typeof document === 'object' && document
    , hack = doc && doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded';
let loaded = doc && (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)

function listener() {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    let callback;
    while (callback = fns.shift()) callback()
}

if (!loaded && doc) {
    doc.addEventListener(domContentLoaded, listener);
}

export default function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
}