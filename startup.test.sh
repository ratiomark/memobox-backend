#!/usr/bin/env bash
set -e

# Ожидание доступности БД(по названию контейнера)
/app/wait-for-it.sh db-test:5432

# Генерация клиента Prisma и запуск seed
echo "Применение миграций и запуск seed..."
npx prisma migrate deploy
npx prisma db seed

# Запуск сервера в фоновом режиме
echo "Запуск сервера..."
node dist/main &

# Ожидание запуска сервера
echo "Ожидание запуска сервера..."
/app/wait-for-it.sh localhost:3000

# Запуск тестов с сохранением логов в файл
echo "Запуск тестов..."
npm run test | tee /test-logs

# Остановка сервера и всех связанных процессов
echo "Остановка сервера и очистка..."
pkill -P $$

echo "Тестирование завершено."