#!/bin/sh

echo "текущий адрес: $PWD"

cd /db-server

if [ -f ".env" ]; then
  source .env
else
  echo "Файл .env не найден!"
  exit 1
fi


# Запускаем PostgreSQL
pg_ctl start -D /var/lib/postgresql/data -l /var/log/postgresql.log &

# Ждем запуска PostgreSQL
sleep 10

# Запускаем Node.js сервер
node /db-server/db-server.js