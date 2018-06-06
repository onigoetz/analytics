To release analytics there are two parts : 

## The platform

```
npm run build
zip dist.zip dist/*.min.js*
```

You can then send the zip to Guillaume Hayoz to put on the Swissquote CDN.

## The typings

Change the version in `typings/package.json` then run:

```
npm publish --registry https://npm.bank.swissquote.ch/repository/sq-npm/
```