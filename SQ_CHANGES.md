# Features Changed in the Swissquote version

## Removed features

- ISO date strings are no longer automatically converted to dates (in facades)

## Removed APIS

- analytics.pageview (legacy alias of analytics.page)
- analytics.trackSubmit (legacy alias of analytics.trackForm)
- analytics.trackClick (legacy alias of analytics.trackLink)
- analytics.alias
- analytics.group

## Integrations Changed apis

- `integration.tag('<script src="{{url}}/piwik.js" />')` is now
  `integration.tag(opt => ({type: 'script', attrs: {src: `${opt.url}/piwik.js`}}))`
- `integration.tag` no longer supports iframes
- `integration.track` no longer calls event methods automatically according to event name