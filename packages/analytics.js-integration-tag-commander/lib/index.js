import createDebug from "debug";

const debug = createDebug("tagcommander");

analytics.use(() => {
  /**
   * Expose `TagCo`.
   */

  const TagCo = analytics
    .integration("tag-commander")
    .tag(opt => ({ type: "script", attrs: { src: opt.url } }));

  /**
   * Initialize.
   *
   * https://commandersact.com/en/products/tagcommander/
   *
   * @api public
   */

  TagCo.prototype.initialize = function() {
    this.load(this.ready);
  };

  /**
   * Loaded?
   *
   * @api private
   * @return {boolean}
   */

  TagCo.prototype.loaded = function() {
    return !!window[`tc_events_${this.options.containerId}`];
  };

  /**
   * Page.
   *
   * @api public
   * @param {Page} page
   */

  TagCo.prototype.page = function(page) {
    debug("Called page() on TagCommander integration");
    window[`tc_events_${this.options.containerId}`](this, "PAGEVIEW", {
      page_name: page.name()
    });
  };

  /**
   * Track.
   *
   * https://developers.google.com/tag-manager/devguide#events
   *
   * @api public
   * @param {Track} track
   */

  TagCo.prototype.track = function(track) {
    window[`tc_events_${this.options.containerId}`](this, track.action(), {
      name: track.name(),
      value: track.value(),
      category: track.category()
    });
  };

  return TagCo;
});
