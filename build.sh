#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
RED="\033[0;31m"
NC="\033[0m" # No Color

#=> component-querystring []
echo -e "${RED}No build needed for component-querystring${NC}"

#=> debug []
echo -e "${RED}No build needed for debug${NC}"

#=> @segment/isodate-traverse []
echo -e "${RED}No build needed for @segment/isodate-traverse${NC}"

#=> segmentio-facade [ '@segment/isodate-traverse' ]
echo -e "${RED}No build needed for segmentio-facade${NC}"

#=> @segment/analytics.js-core [ '@segment/isodate-traverse','@segment/top-domain','component-cookie','component-querystring','debug','segmentio-facade' ]
echo -e "${RED}No build needed for @segment/isodate-traverse${NC}"

#=> analytics.js [ '@segment/analytics.js-core' ]
echo -e "${RED}Building @segment/analytics.js${NC}\n"
cd "$DIR/packages/analytics.js"
npm run build -- --profile --json > profile.json

#=> @segment/analytics.js-integration-google-tag-manager [ '@segment/analytics.js-core' ]
echo -e "${RED}Building @segment/analytics.js-integration-google-tag-manager${NC}\n"
cd "$DIR/packages/analytics.js-integration-google-tag-manager"
npm run build

#=> @segment/analytics.js-integration-piwik [ '@segment/analytics.js-core', 'debug' ]
echo -e "${RED}Building @segment/analytics.js-integration-piwik${NC}\n"
cd "$DIR/packages/analytics.js-integration-piwik"
npm run build

#=> @segment/analytics.js-integration-tagcommander [ '@segment/analytics.js-core' ]
echo -e "${RED}Building @segment/analytics.js-integration-tagcommander${NC}\n"
cd "$DIR/packages/analytics.js-integration-tagcommander"
npm run build

#=> script
node_modules/.bin/uglifyjs testpage/script.js --compress --mangle > testpage/script.min.js