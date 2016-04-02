#!/bin/bash -e
set -o pipefail

if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]  && [ "$TRAVIS_NODE_VERSION" = "5.1" ]
then
  npm test
  gulp
  docker build -t peter-mueller/flight-analyzer .
  docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
  docker push peter-mueller/flight-analyzer
else
  npm test
fi
