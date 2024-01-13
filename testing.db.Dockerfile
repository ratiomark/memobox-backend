# Используем базовый образ PostgreSQL
FROM postgres:16-alpine

# Устанавливаем Node.js и npm
RUN apk add --no-cache nodejs npm

# Создаем директорию для нашего мини-сервера
WORKDIR /db-server

# Копируем файлы сервера
COPY /test/docker/db-server.js ./
COPY /test/docker/package.json ./

# Устанавливаем зависимости сервера
RUN npm install

# Открываем порт для сервера
EXPOSE 3001

# Скрипт для запуска PostgreSQL и сервера
COPY start-test-db-server.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/start-test-db-server.sh

ENTRYPOINT ["start-test-db-server.sh"]