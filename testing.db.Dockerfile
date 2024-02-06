# Используем базовый образ PostgreSQL
FROM postgres:16-alpine

# ENV PGDATA /var/lib/postgresql/data

# Устанавливаем Node.js и npm
RUN apk add --no-cache nodejs npm

# Создаем директорию для нашего мини-сервера
WORKDIR /db-server

# Копируем файлы сервера
COPY /test/docker/db-server.js ./
COPY /test/docker/package.json ./
COPY /.env.testing ./.env
# Устанавливаем зависимости сервера
RUN npm install

# Открываем порт для сервера
EXPOSE 3001

# Скрипт для запуска PostgreSQL и сервера
COPY start-test-db-server.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/start-test-db-server.sh

# ENTRYPOINT ["postgres"]
ENTRYPOINT ["/usr/local/bin/start-test-db-server.sh"]