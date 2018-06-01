#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
RED="\033[0;31m"
NC="\033[0m" # No Color

if [ ! -d dist ]; then
  mkdir dist
fi

#=> analytics.js [ '@segment/analytics.js-core' ]
echo -e "${RED}Building @segment/analytics.js${NC}\n"
cd "$DIR/packages/analytics.js"
npm run build
cp -f "dist/analytics.min.js" "$DIR/dist/analytics.min.js"
cp -f "dist/analytics.min.js.map" "$DIR/dist/analytics.min.js.map"
cp -f "dist/profile.json" "$DIR/dist/analytics-profile.json"

#=> @segment/analytics.js-integration-google-tag-manager [ '@segment/analytics.js-core' ]
echo -e "${RED}Building @segment/analytics.js-integration-google-tag-manager${NC}\n"
cd "$DIR/packages/analytics.js-integration-google-tag-manager"
npm run build
cp -f "dist/analytics-google-tag-manager.min.js" "$DIR/dist/analytics-google-tag-manager.min.js"
cp -f "dist/analytics-google-tag-manager.min.js.map" "$DIR/dist/analytics-google-tag-manager.min.js.map"
cp -f "dist/profile.json" "$DIR/dist/analytics-google-tag-manager-profile.json"

#=> @segment/analytics.js-integration-piwik [ '@segment/analytics.js-core', 'debug' ]
echo -e "${RED}Building @segment/analytics.js-integration-piwik${NC}\n"
cd "$DIR/packages/analytics.js-integration-piwik"
npm run build
cp -f "dist/analytics-piwik.min.js" "$DIR/dist/analytics-piwik.min.js"
cp -f "dist/analytics-piwik.min.js.map" "$DIR/dist/analytics-piwik.min.js.map"
cp -f "dist/profile.json" "$DIR/dist/analytics-piwik-profile.json"

#=> @segment/analytics.js-integration-tagcommander [ '@segment/analytics.js-core' ]
echo -e "${RED}Building @segment/analytics.js-integration-tag-commander${NC}\n"
cd "$DIR/packages/analytics.js-integration-tag-commander"
npm run build
cp -f "dist/analytics-tag-commander.min.js" "$DIR/dist/analytics-tag-commander.min.js"
cp -f "dist/analytics-tag-commander.min.js.map" "$DIR/dist/analytics-tag-commander.min.js.map"
cp -f "dist/profile.json" "$DIR/dist/analytics-tag-commander-profile.json"

#=> script
cd "$DIR"
node_modules/.bin/uglifyjs testpage/script.js --compress --mangle > testpage/script.min.js