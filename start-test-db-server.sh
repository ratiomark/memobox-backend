#!/bin/sh

echo "текущий адрес: $PWD"

cd /db-server

if [ -f ".env" ]; then
  source .env
else
  echo "Файл .env не найден!"
  exit 1
fi

/usr/local/bin/docker-entrypoint.sh postgres &

sleep 5

node /db-server/db-server.js