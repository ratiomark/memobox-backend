#!/usr/bin/env bash
# Выше: Это шебанг (shebang), который указывает системе, что этот скрипт должен быть выполнен с помощью bash, оболочки командной строки.
set -e
#  Эта команда указывает bash прекратить выполнение скрипта, если любая команда завершается с неудачей (возвращает статус выхода, отличный от нуля). Это помогает предотвратить продолжение выполнения скрипта в случае возникновения ошибок.

if [ -f ".env" ]; then
  source .env
else
  echo "Файл .env не найден!"
  exit 1
fi

chmod +x /app/wait-for-it.sh

echo "Ожидание БД..."
/opt/wait-for-it.sh ${DATABASE_CONTAINER_NAME}:${DATABASE_PORT} -t 60
echo "Ожидание Редиса..."
/opt/wait-for-it.sh ${REDIS_CONTAINER_NAME}:${REDIS_PORT} -t 60
echo "БД и РЕДИС доступны."

npm run start:db

echo "Запуск сервера..."
node dist/main
# : Этот скрипт используется для ожидания, пока сервис (в данном случае PostgreSQL на порту 5432) не станет доступным. Это полезно, потому что контейнеры Docker могут запускаться в любом порядке, и ваше приложение может попытаться подключиться к базе данных до того, как она будет готова к работе.
