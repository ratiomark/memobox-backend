#!/usr/bin/env bash
# Выше: Это шебанг (shebang), который указывает системе, что этот скрипт должен быть выполнен с помощью bash, оболочки командной строки.
set -e
#  Эта команда указывает bash прекратить выполнение скрипта, если любая команда завершается с неудачей (возвращает статус выхода, отличный от нуля). Это помогает предотвратить продолжение выполнения скрипта в случае возникновения ошибок.

/app/wait-for-it.sh postgres:5432
# : Этот скрипт используется для ожидания, пока сервис (в данном случае PostgreSQL на порту 5432) не станет доступным. Это полезно, потому что контейнеры Docker могут запускаться в любом порядке, и ваше приложение может попытаться подключиться к базе данных до того, как она будет готова к работе.
# npm run start:db
# npm run seed:run

# RUN npx prisma db push --accept-data-loss
# RUN npx prisma generate
echo "База данных доступна, выполняем миграции..."
# npx prisma migrate deploy
npx prisma migrate deploy
npx prisma db seed
# npx prisma db push --accept-data-loss # или npx prisma migrate deploy
# npx prisma migrate reset
# npx ts-node -T ./prisma/seed.ts
# npx prisma migrate deploy

echo "Запуск приложения..."
node dist/main
# npm run start:prod
