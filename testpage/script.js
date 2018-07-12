(function(window, document) {
  var integrations = [
    "analytics.min.js",
    "analytics-piwik.min.js",
    //'analytics-google-tag-manager.min.js',
    "analytics-tag-commander.min.js"
  ];

  var configuration = {
    piwik: { url: "https://www.swissquote.ch/stats/", siteId: 99 },
    //"Google Tag Manager": { containerId: "GTM-WZF46K" },
    "tag-commander[0]": {
      containerId: 20,
      url: "http://cdn.tagcommander.com/4206/tc_SwissquoteSandbox_20.js"
    },
    "tag-commander[1]": {
      containerId: 21,
      url: "http://cdn.tagcommander.com/4206/tc_SwissquoteSandbox_21.js"
    }
  };

  //var basePath = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'analytics.swissquote.ch/' + integration;
  var basePath = "/scripts/";

  var calls = [];

  // Create an analytics object
  var analytics = (window.analytics = window.analytics || {});

  // Count the integrations to load
  var toLoad = 0;

  // Get first script element
  var first = document.getElementsByTagName("script")[0];

  // If the real analytics.js is already on the page return.
  if (analytics.initialize) return;

  // Make sure the snippet is never invoked twice.
  analytics.initialize = true;

  // For each of our methods, generate a queueing stub. These are
  // placeholders for methods in Analytics.js so that you never have
  // to wait for it to load to actually record data. The `method`
  // is stored as the first argument, so we can replay the data.
  "trackLink|trackForm|identify|reset|track|ready|alias|debug|page|once|off|on|use"
    .split("|")
    .forEach(function(method) {
      analytics[method] = function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        calls.push(args);
        return analytics;
      };
    });

  // Define a method to load Analytics.js from our CDN,
  // and that will be sure to only ever load it once.
  integrations.forEach(function(integration) {
    toLoad++;
    // Create an async script element based on your key.
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = 1;
    script.src = basePath + integration;
    script.onload = function() {
      toLoad--;

      if (!toLoad) {
        // Replace dummy implementation with the real thing
        // Apply configuration
        // Replay the calls
        window.analyticsImpl.start(calls, configuration);
      }
    };

    // Insert our script next to the first script element.
    first.parentNode.insertBefore(script, first);
  });
})(window, document);
