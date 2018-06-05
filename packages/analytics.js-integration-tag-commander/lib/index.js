/* global tc_vars */
import createDebug from "debug";

import "./tagco_provided";

const debug = createDebug("tagcommander");

analytics.use(() => {
  /**
   * Expose `GTM`.
   */

  const TagCo = analytics
    .integration("tag-commander")
    .global("tc_vars")
    .option("siteId", "")
    .option("trackNamedPages", true)
    .option("trackCategorizedPages", true);

  /**
   * Initialize.
   *
   * https://developers.google.com/tag-manager
   *
   * @api public
   */

  TagCo.prototype.initialize = function() {
    window.tc_vars = window.tc_vars || {};

    // `this.ready()` must be called when the integration is ready,
    // otherwise all calls will be queued. until it is ready.
    //this.load(this.ready);
    this.ready();
  };

  /**
   * Loaded?
   *
   * @api private
   * @return {boolean}
   */

  TagCo.prototype.loaded = function() {
    return true;
    // This would be needed if an external script needs to be loaded
    //return !!(window.dataLayer && Array.prototype.push !== window.dataLayer.push);
  };

  /**
   * Page.
   *
   * @api public
   * @param {Page} page
   */

  TagCo.prototype.page = function(page) {
    debug("Called page() on TagCommander integration");
    window.tc_vars.page_name = page.fullName();

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

  TagCo.prototype.track = function(track) {
    debug("Called track() on TagCommander integration");
    //tc_vars.qqch = "";

    //tc_events_global(var1, var2, var3)


    /*var props = track.properties();
        var userId = this.analytics.user().id();
        var anonymousId = this.analytics.user().anonymousId();
        if (userId) props.userId = userId;
        if (anonymousId) props.segmentAnonymousId = anonymousId;
        props.event = track.event();

        push(props);*/
  };

  return TagCo;
});
