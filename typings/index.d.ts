// Type definitions for Segment's analytics.js
// Project: https://segment.com/docs/libraries/analytics.js/
// Definitions by: Andrew Fong <https://github.com/fongandrew>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare namespace SegmentAnalytics {

  // Generic options object with integrations
  interface SegmentOpts {
    integrations?: any;
    anonymousId?: string;
  }

  interface AnalyticsTrackProperties {
    category?: string;
    name?: string;
    value?: string;
    revenue?: number;

    [key: string]: any;
  }

  interface AnalyticsPageProperties extends AnalyticsTrackProperties {
    [key: string]: any;
  }

  interface AnalyticsTrackOptions {
    piwik?: {
      customVars?: { [key: string]: any; }
    }
  }


  // The actual analytics.js object
  interface AnalyticsJS {
    /**
     * Set the user's `id`.
     *
     * @param id
     */
    setAnonymousId(id: string | number);

    /**
     * Identify a user by optional `id` and `traits`.
     * 
     * The identify method is how you tie one of your users and their actions 
     * to a recognizable userId and traits.
     *
     * @param {string} [userId=user.id()] User ID
     * @param {Object} [traits] User traits
     * @param {Object} [options] Identification options
     * @param {Function} [callback] Callback on identification
     * @return {Analytics}
     */
    identify(userId: string, traits?: Object, options?: SegmentOpts,
      callback?: () => void): void;
    identify(userId: string, traits: Object, callback?: () => void): void;
    identify(userId: string, callback?: () => void): void;
    identify(traits?: Object, options?: SegmentOpts,
      callback?: () => void): void;
    identify(traits?: Object, callback?: () => void): void;
    identify(callback: () => void): void;


    /**
     * Track an `event` that a user has triggered with optional `properties`.
     * 
     * The track method lets you record any actions your users perform.
     *
     * @param {string} event
     * @param {AnalyticsTrackProperties} [properties]
     * @param {AnalyticsTrackOptions} [options]
     * @param {Function} [callback]
     * @return {Analytics}
     */
    track(
      event: string,
      properties: AnalyticsTrackProperties,
      options: SegmentOpts,
      callback?: () => void
    ): void;
    track(
      event: string,
      properties: AnalyticsTrackProperties,
      callback?: () => void
    ): void;
    track(event: string, callback?: () => void): void;

    /**
     * Trigger a pageview, labeling the current page with an optional `category`,
     * `name` and `properties`.
     * 
     * The page method lets you record page views on your website, 
     * along with optional extra information about the page being viewed.
     *
     * @param {string} [category]
     * @param {string} [name]
     * @param {Object|string} [properties] (or path)
     * @param {Object} [options]
     * @param {Function} [callback]
     * @return {Analytics}
     */
    page(
      category: string,
      name: string,
      properties?: AnalyticsPageProperties,
      options?: SegmentOpts,
      callback?: () => void
    ): void;
    page(
      name?: string,
      properties?: AnalyticsPageProperties,
      options?: SegmentOpts,
      callback?: () => void
    ): void;
    page(
      name?: string,
      properties?: AnalyticsPageProperties,
      callback?: () => void
    ): void;
    page(
      properties?: AnalyticsPageProperties,
      options?: SegmentOpts,
      callback?: () => void
    ): void;
    page(name?: string, callback?: () => void): void;

    /**
     * trackLink is a helper that binds a track call to whenever a link is 
     * clicked. Usually the page would change before you could call track, but
     * with trackLink a small timeout is inserted to give the track call enough
     * time to fire.
     *
     * @param {Element|Element[]} elements
     * @param {string|Function} event
     * @param {AnalyticsTrackProperties|Function} [properties]
     * @return {Analytics}
     */
    trackLink(
      elements: Element[] | Element,
      event: string | { (elm: Element): string },
      properties?: AnalyticsTrackProperties | ((el: Element) => AnalyticsTrackProperties)
    );


    /**
     * trackForm is a helper that binds a track call to a form submission.
     * Usually the page would change before you could call track, but with
     * trackForm a small timeout is inserted to give the track call enough
     * time to fire.
     *
     * @param {Element|Element[]} elements
     * @param {string|Function} event
     * @param {AnalyticsTrackProperties|Function} [properties]
     * @return {Analytics}
     */
    trackForm(
      elements: Element[] | Element,
      event: string | { (elm: Element): string },
      properties?: AnalyticsTrackProperties | ((el: Element) => AnalyticsTrackProperties)
    ): void;

    /**
     * The ready method allows you to pass in a callback that will be called as
     * soon as all of your enabled integrations have loaded. It’s like jQuery’s
     * ready method, except for integrations.
     * 
     * @param {Function} callback
     * @return {Analytics}
     */
    ready(callback: () => void): void;

    /**
     * Analytics.js has a debug mode that logs helpful messages to the console.
     *
     * @param {string|boolean} str
     */
    debug(str?: string | boolean);

    /**
     * If you need to clear the user and group id and traits we’ve added a
     * reset function that is most commonly used when your identified users
     * logout of your application.
     */
    reset(): void;

    /**
     * Once Analytics.js loaded, you can retrieve information about the
     * currently identified user or group like their id and traits.
     */
    user(): {
      id(): string;
      logout(): void;
      reset(): void;
      anonymousId(newId?: string): string;
      traits(newTraits?: Object): void;
    }

    /**
     * The global analytics object emits events whenever you call alias, group,
     * identify, track or page. That way you can listen to those events and run
     * your own custom code.
     */
    on(event: string,
      callback: {
        (event: string, properties: Object, options: SegmentOpts): void
      }): void;
  }
}

declare var analytics: SegmentAnalytics.AnalyticsJS;

interface Window {
  analytics: SegmentAnalytics.AnalyticsJS;
}
