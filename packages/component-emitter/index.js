/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */
function Emitter() {}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event The event's name
 * @param {Function} fn The event handler
 * @return {Emitter}
 * @api public
 */
Emitter.prototype.on = Emitter.prototype.addEventListener = function(
  event,
  fn
) {
  this._callbacks = this._callbacks || {};
  (this._callbacks[`$${event}`] = this._callbacks[`$${event}`] || []).push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event The event's name
 * @param {Function} fn The event handler
 * @return {Emitter}
 * @api public
 */
Emitter.prototype.once = function(event, fn) {
  function on(...args) {
    this.off(event, on);
    fn(...args);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event The event's name
 * @param {Function} fn The event handler
 * @return {Emitter}
 * @api public
 */
Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(
  event,
  fn
) {
  this._callbacks = this._callbacks || {};

  // all
  if (arguments.length === 0) {
    this._callbacks = {};
    return this;
  }

  // specific event
  const callbacks = this._callbacks[`$${event}`];
  if (!callbacks) {
    return this;
  }

  // remove all handlers
  if (arguments.length === 1) {
    delete this._callbacks[`$${event}`];
    return this;
  }

  // remove specific handler
  let cb;
  for (let i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event The event's name
 * @param {Mixed} args The event's values
 * @return {Emitter}
 */
Emitter.prototype.emit = function(event, ...args) {
  this._callbacks = this._callbacks || {};
  let callbacks = this._callbacks[`$${event}`];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (let i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event The event's name
 * @return {Array}
 * @api public
 */
Emitter.prototype.listeners = function(event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks[`$${event}`] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event The event's name
 * @return {Boolean}
 * @api public
 */
Emitter.prototype.hasListeners = function(event) {
  return !!this.listeners(event).length;
};

/**
 * Expose `Emitter`.
 */
export default Emitter;
