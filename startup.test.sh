#!/usr/bin/env bash
set -e

# echo "текущий адрес: $PWD"

if [ -f ".env" ]; then
  source .env
else
  echo "Файл .env не найден!"
  exit 1
fi


# Ожидание доступности БД(по названию контейнера)
chmod +x /app/wait-for-it.sh
/app/wait-for-it.sh ${DATABASE_CONTAINER_NAME}:${DATABASE_PORT}

# Генерация клиента Prisma и запуск seed
echo "Применение миграций и запуск seed..."
# npx prisma migrate deploy
# npx prisma db seed
npx prisma migrate deploy
npx prisma db seed
# npm run seed:run
# npm run start:prod

/app/wait-for-it.sh redis-test:6379
# Запуск сервера в фоновом режиме
echo "Запуск сервера..."
node dist/main &

# Ожидание запуска сервера
echo "Ожидание запуска сервера..."
# sleep 40  
/app/wait-for-it.sh back-test:3001

# Запуск тестов с сохранением логов в файл
echo "Запуск тестов..."
npm run test | tee /test-logs

# Остановка сервера и всех связанных процессов
echo "Остановка сервера и очистка..."
pkill -P $$

echo "Тестирование завершено."