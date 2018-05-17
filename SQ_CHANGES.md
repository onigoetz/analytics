# Features Changed in the Swissquote version

## Removed APIS

- analytics.pageview (old alias of analytics.page)
- analytics.alias
- analytics.group

## Integrations Changed apis

- `integration.tag('<script src="{{url}}/piwik.js" />')` is now
  `integration.tag(opt => ({type: 'script', attrs: {src: `${opt.url}/piwik.js`}}))`
- `integration.tag` no longer supports iframes
- `integration.track` no longer calls event methods automatically according to event name