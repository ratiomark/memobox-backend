FROM node:18.18.0-alpine

RUN apk add --no-cache bash
RUN npm i -g @nestjs/cli typescript ts-node

COPY package*.json /tmp/app/
RUN cd /tmp/app && npm install

COPY . /usr/src/app
RUN cp -a /tmp/app/node_modules /usr/src/app
# Копирует скрипт wait-for-it.sh в директорию /opt/ внутри контейнера. Этот скрипт обычно используется для ожидания доступности порта или сервиса.
COPY ./wait-for-it.sh /opt/wait-for-it.sh
# Делает скрипт wait-for-it.sh исполняемым.
RUN chmod +x /opt/wait-for-it.sh
COPY ./startup.dev.sh /opt/startup.dev.sh
RUN chmod +x /opt/startup.dev.sh
# Удаляет символы возврата каретки (\r) из скриптов, что может быть необходимо, если скрипты были созданы в Windows.
RUN sed -i 's/\r//g' /opt/wait-for-it.sh
RUN sed -i 's/\r//g' /opt/startup.dev.sh

WORKDIR /usr/src/app
# Проверяет наличие файла .env. Если он отсутствует, копирует env-example в .env. Это может быть шаблоном для переменных окружения.
RUN if [ ! -f .env ]; then cp env-example .env; fi
# : Генерирует клиент Prisma, который используется для взаимодействия с базой данных.
RUN npx prisma generate
RUN npm run build

CMD ["/opt/startup.dev.sh"]
