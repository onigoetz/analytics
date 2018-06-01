declare interface AnalyticsTrackProperties {
    category: string;
    name: string;
    value: string;
    revenue: number;

    [key: string]: any;
}

declare interface AnalyticsPageProperties extends AnalyticsTrackProperties {
    [key: string]: any;
}

declare interface AnalyticsTrackOptions {
    piwik: {
        customVars: {[key: string]: any;}
        cvar: {[key: string]: any;}
    }
}

// TODO :: track goals

declare interface Analytics {
    /**
     * Set the user's `id`.
     *
     * @param id
     */
    setAnonymousId(id: string|number);

    /**
     * Identify a user by optional `id` and `traits`.
     *
     * @param {string} [id=user.id()] User ID
     * @param {Object} [traits] User traits
     * @param {Object} [options] Identification options
     * @param {Function} [fn] Callback on identification
     * @return {Analytics}
     */
    identify(id?: string, traits?: {[key: string]: any}, options?: {[key: string]: any}, fn?: () => void);
    identify(id?: string, traits?: {[key: string]: any}, fn?: () => void);
    identify(id?: string, fn?: () => void);
    identify(traits: {[key: string]: any}, options?: {[key: string]: any}, fn?: () => void);
    identify(traits: {[key: string]: any}, fn?: () => void);

    /**
     * Return the current user.
     *
     * @return {Object}
     */
    user(): any;

    /**
     * Track an `event` that a user has triggered with optional `properties`.
     *
     * @param {string} event
     * @param {AnalyticsTrackProperties} [properties]
     * @param {AnalyticsTrackOptions} [options]
     * @param {Function} [fn]
     * @return {Analytics}
     */
    track(event: string, properties?: AnalyticsTrackProperties, options?: AnalyticsTrackOptions, fn?: () => void);
    track(event: string, properties?: AnalyticsTrackProperties, fn?: () => void);
    track(event: string, fn?: () => void);

    /**
     * Helper method to track an outbound link that would normally navigate away
     * from the page before the analytics calls were sent.
     *
     * @param {Element|Array} links
     * @param {string|Function} event
     * @param {AnalyticsTrackProperties|Function} [properties]
     * @return {Analytics}
     */
    trackLink(
        links: Element|Element[],
        event: string|((el: Element) => string),
        properties?: AnalyticsTrackProperties|((el: Element) => AnalyticsTrackProperties)
    );
    
    /**
     * Helper method to track an outbound form that would normally navigate away
     * from the page before the analytics calls were sent.
     *
     * @param {Element|Array} forms
     * @param {string|Function} event
     * @param {AnalyticsTrackProperties|Function} [properties]
     * @return {Analytics}
     */
    trackForm(
        links: Element|Element[],
        event: string|((el: Element) => string),
        properties?: AnalyticsTrackProperties|((el: Element) => AnalyticsTrackProperties)
    );

    /**
     * Trigger a pageview, labeling the current page with an optional `category`,
     * `name` and `properties`.
     *
     * @param {string} [category]
     * @param {string} [name]
     * @param {Object|string} [properties] (or path)
     * @param {Object} [options]
     * @param {Function} [fn]
     * @return {Analytics}
     */
    page(category?: string, name?: name, properties?: AnalyticsPageProperties, options?: {[key: string]: any}, fn?: () => void);
    page(category?: string, name?: name, properties?: AnalyticsPageProperties, fn?: () => void);
    page(category?: string, name?: name, fn?: () => void);
    page(name?: string, fn?: () => void);
    page(properties?: AnalyticsPageProperties, options?: {[key: string]: any}, fn?: () => void);
    page(name?: string, properties?: AnalyticsPageProperties, options?: {[key: string]: any}, fn?: () => void);

    /**
     * Register a `fn` to be fired when all the analytics services are ready.
     *
     * @param {Function} fn
     * @return {Analytics}
     */
    ready(fn: () => void);

    /**
     * Enable or disable debug.
     *
     * @param {string|boolean} str
     */
    debug(str?);

    /**
     * Reset user traits and id's.
     */
    reset();
}

declare interface Window {
    analytics: Analytics;
}