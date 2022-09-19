#!/bin/bash


echo "My entrypoint is $1"

case "$1" in
  production)
      exec node packages/backend --config /opt/app-config/app-config.yaml
    ;;
  dev)
    LOG_LEVEL="debug" \
      exec node packages/backend --config app-config.yaml --config app-config.local.yaml
    ;;
  *)
    echo "Usage: entrypoint.sh [dev|production]"
    ;;
esac

