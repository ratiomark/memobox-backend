###################
# DEPENDENCIES 
###################
# Этап генерации package-lock.json
FROM node:16-alpine as dependencies

WORKDIR /app

COPY app/package.json ./

# Удаляем husky из скрипта prepare
RUN sed -i '/\"prepare\":/d' package.json

# Установка зависимостей с помощью npm для генерации package-lock.json
RUN npm install --package-lock-only

##################
# PREBUILD 
##################
FROM node:16-alpine as prebuild
WORKDIR /app
COPY --from=dependencies /app/package.json ./
COPY --from=dependencies /app/package-lock.json ./
# RUN npm ci
RUN npm i

###################
# BUILD 
###################
FROM node:16-alpine as build


WORKDIR /app

# Игнорируем src и prisma в .dockerignore, копируем остальные файлы
COPY app/ ./
COPY --from=prebuild /app/node_modules ./node_modules
# Копируем свежий и синхронизированный package-lock.json
# COPY --from=dependencies app/package-lock.json ./
# COPY --from=dependencies app/package.json ./

# Отдельно копируем src и prisma
COPY app/src ./src/
COPY app/.env.production ./.env
COPY app/startup.dev.sh  ./startup.dev.sh 
COPY app/wait-for-it.sh   ./wait-for-it.sh 
COPY app/prisma ./prisma/

ENV NODE_ENV=production
# ENV NODE_ENV production

# Установка зависимостей и сборка приложения
# RUN npm ci --only=production
# RUN npm install
RUN npx prisma generate
RUN npm run build
# RUN sleep 180
# RUN exit 0

# Генерация Prisma клиента
# RUN npx prisma db push --accept-data-loss
# RUN npx prisma migrate deploy


###################
# PRODUCTION
###################
# Этап запуска
FROM node:16-alpine
RUN apk add --no-cache bash
# RUN exit 0
WORKDIR /app

# Копирование собранного приложения и зависимостей из этапа сборки
COPY --from=dependencies /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/.env.production ./dist/.env
COPY --from=build /app/.env.production ./.env
COPY --from=build /app/startup.dev.sh ./startup.dev.sh
COPY --from=build /app/wait-for-it.sh  ./wait-for-it.sh 
ENV NODE_ENV=production
# COPY ./wait-for-it.sh /opt/wait-for-it.sh
# Делает скрипт wait-for-it.sh исполняемым.
# RUN chmod +x /opt/wait-for-it.sh
# Копируем остальные необходимые файлы
# COPY --from=build /app ./

# Экспорт порта и запуск приложения
EXPOSE 3000
RUN chmod +x /app/startup.dev.sh
ENTRYPOINT ["/app/startup.dev.sh"]
# CMD ["node", "dist/main"]
# COPY entrypoint.sh /entrypoint.sh















# # Этап сборки
# FROM node:16-alpine as build

# WORKDIR /app

# # Игнорируем src и prisma в .dockerignore, копируем остальные файлы
# COPY app/ ./

# # Отдельно копируем src и prisma
# COPY app/src ./src/
# COPY app/prisma ./prisma/

# # Установка зависимостей и сборка приложения
# RUN npm ci
# RUN npm run build

# # Генерация Prisma клиента
# RUN npx prisma generate

# # Этап запуска
# FROM node:16-alpine

# WORKDIR /app

# # Копирование собранного приложения и зависимостей из этапа сборки
# COPY --from=build /app/node_modules ./node_modules
# COPY --from=build /app/dist ./dist
# COPY --from=build /app/prisma ./prisma

# # Копируем остальные необходимые файлы
# # COPY --from=build /app ./

# # Экспорт порта и запуск приложения
# EXPOSE 3000
# CMD ["node", "dist/main"]