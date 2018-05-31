#!/usr/bin/env bash

GREEN='\033[0;32m'
NC='\033[0m'

echo -e "$GREEN-- Auto Formatting$NC"
echo
prettier --write "packages/*/*.js" "packages/*/src/**/*.js" "packages/*/bin/**/*.js" "packages/*/lib/**/*.js" "packages/*/package.json"

echo
echo -e "$GREEN-- ESLint$NC"
echo
node node_modules/.bin/eslint --fix packages/*/*.js packages/*/src/**/*.js packages/*/bin/**/*.js packages/*/lib/**/*.js