/* global WebKitMutationObserver */

function callable(fn) {
  if (typeof fn !== "function") {
    throw new TypeError(`${fn} is not a function`);
  }
  return fn;
}

function byObserver(Observer) {
  const node = document.createTextNode("");
  let queue,
    i = 0;
  new Observer(() => {
    if (!queue) {
      return;
    }
    const data = queue;
    queue = null;
    if (typeof data === "function") {
      data();
      return;
    }
    data.forEach(fn => {
      fn();
    });
  }).observe(node, { characterData: true });
  return function(fn) {
    callable(fn);
    if (queue) {
      if (typeof queue === "function") {
        queue = [queue, fn];
      } else {
        queue.push(fn);
      }
      return;
    }
    queue = fn;
    node.data = i = ++i % 2;
  };
}

export default (function() {
  // MutationObserver=
  if (typeof document === "object" && document) {
    if (typeof MutationObserver === "function") {
      return byObserver(MutationObserver);
    }
    if (typeof WebKitMutationObserver === "function") {
      return byObserver(WebKitMutationObserver);
    }
  }

  // Wide available standard
  if (typeof setTimeout === "function") {
    return function(cb) {
      setTimeout(callable(cb), 0);
    };
  }

  return null;
})();
