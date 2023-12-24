###################
# DEPENDENCIES
###################
FROM node:16-alpine as dependencies

WORKDIR /app

# Сначала копируем только package.json и package-lock.json
COPY package.json package-lock.json ./

# Удаляем husky из скрипта prepare
RUN sed -i '/\"prepare\":/d' package.json

# Установка зависимостей
RUN npm install

###################
# BUILD
###################
FROM node:16-alpine as build

WORKDIR /app

# Копируем все остальные файлы
COPY . .

# Копируем node_modules из предыдущего слоя
COPY --from=dependencies /app/node_modules ./node_modules

# Генерируем Prisma клиент и собираем приложение
RUN npx prisma generate
RUN npm run build

###################
# TESTING
###################
FROM node:16-alpine

RUN apk add --no-cache bash

WORKDIR /app

# Копируем необходимые файлы из этапа сборки
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/src ./src
COPY --from=build /app/test ./test
COPY --from=build /app/.env.testing ./dist/.env
COPY --from=build /app/.env.testing ./.env
COPY --from=build /app/startup.test.sh ./startup.test.sh
COPY --from=build /app/wait-for-it.sh  ./wait-for-it.sh 
COPY --from=build /app/tsconfig.build.json  ./tsconfig.build.json
COPY --from=build /app/tsconfig.json  ./tsconfig.json

RUN chmod +x /app/startup.test.sh
ENTRYPOINT ["/app/startup.test.sh"]