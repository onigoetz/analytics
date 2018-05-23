
import globalQueue from 'global-queue';

import createDebug from "debug";

import "./tagco_provided"

const debug = createDebug("tagcommander");

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