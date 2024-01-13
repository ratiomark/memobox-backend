#!/bin/sh

# Запускаем PostgreSQL
pg_ctl start -D /var/lib/postgresql/data -l /var/log/postgresql.log &

# Ждем запуска PostgreSQL
sleep 10

# Запускаем Node.js сервер
node /db-server/db-server.js