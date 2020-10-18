#!/bin/bash
# get project name and version
name=`jq .name package.json`
name=${name//\"/}
version=`jq .version package.json`
version=${version//\"/}

if [ "$1"x = "tag"x ]; then
  npm init --scope=@guozhl
  npm publish --access public
else
  snapVersion=$version-snap
  # snap suffix added to the version number
  jq '.version |= "'$snapVersion'"' package.json > temp.json
  # modify the version number after backup
  cp package.json package.bak.json && mv temp.json package.json
  # delete the old version
  npm unpublish $name@$snapVersion
  # release the snap version
  npm publish
  # restore package.json
  mv package.bak.json package.json
fi
