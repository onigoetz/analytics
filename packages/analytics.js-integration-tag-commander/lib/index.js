
/* global analytics */
analytics.use(() => {
  /**
   * Expose `TagCo`.
   */

  const TagCo = analytics
    .integration("tag-commander")
    .global("tc_vars")
    .tag(opt => ({ type: "script", attrs: { src: opt.url } }));

  /**
   * Initialize.
   *
   * https://commandersact.com/en/products/tagcommander/
   *
   * @api public
   */

  TagCo.prototype.initialize = function() {
    window.tc_vars = window.tc_vars || {};
    this.load(this.ready);
  };

  /**
   * Loaded?
   *
   * @api private
   * @return {boolean}
   */

  TagCo.prototype.loaded = function() {
    return !!window.tC;
  };

  /**
   * Page.
   *
   * @api public
   * @param {Page} page
   */

  TagCo.prototype.page = function(page) {
    window.tc_vars.page_name = page.name();
    window.tC.container.reload({events: {page: [{}, {}]}});
  };

  /**
   * Track.
   *
   * The tracking is only available if the method tc_events_<containerId> is available
   *
   * @api public
   * @param {Track} track
   */

  TagCo.prototype.track = function(track) {
    if (!!window[`tc_events_${this.options.containerId}`]) {
      window[`tc_events_${this.options.containerId}`](this, track.action(), {
        name: track.name(),
        value: track.value(),
        category: track.category()
      });
    }
  };

  return TagCo;
});
