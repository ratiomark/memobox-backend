###################
# DEPENDENCIES 
###################
FROM node:16-alpine as dependencies

WORKDIR /app

COPY package.json ./
RUN ls -a
# COPY src ./
# COPY prisma ./
# COPY test ./

RUN sed -i '/\"prepare\":/d' package.json
RUN npm install --package-lock-only

##################
# PREBUILD 
##################
FROM node:16-alpine as prebuild
WORKDIR /app


# COPY . . 
# COPY src ./src
# COPY prisma ./
# COPY test ./
# COPY --from=dependencies /app/ ./
COPY --from=dependencies /app/package.json ./
COPY --from=dependencies /app/package-lock.json ./
# RUN npm ci
RUN npm i

###################
# BUILD 
###################
FROM node:16-alpine as build


WORKDIR /app

COPY --from=prebuild /app ./
# COPY /src ./src
# COPY prisma ./
# COPY test ./
COPY --from=prebuild /app/node_modules ./node_modules
COPY --from=prebuild /app/package.json ./package.json
# Копируем свежий и синхронизированный package-lock.json

# ENV NODE_ENV testing

# Установка зависимостей и сборка приложения
# RUN npm ci --only=testing
# RUN npm install
RUN npx prisma generate
RUN npm run build
# RUN sleep 180
# RUN exit 0

# Генерация Prisma клиента
# RUN npx prisma db push --accept-data-loss
# RUN npx prisma migrate deploy


###################
# testing
###################
# Этап запуска
FROM node:16-alpine
RUN apk add --no-cache bash
# RUN exit 0
WORKDIR /app

# Копирование собранного приложения и зависимостей из этапа сборки
# COPY /app ./
COPY --from=dependencies /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/src ./src
COPY --from=build /app/test ./test
COPY --from=build /app/.env.testing ./dist/.env
COPY --from=build /app/.env.testing ./.env
COPY --from=build /app/startup.test.sh ./startup.test.sh
COPY --from=build /app/wait-for-it.sh  ./wait-for-it.sh 

EXPOSE 3000
RUN chmod +x /app/startup.test.sh
ENTRYPOINT ["/app/startup.test.sh"]
















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
# ###################
# # DEPENDENCIES 
# ###################
# FROM node:16-alpine as dependencies

# WORKDIR /app

# COPY package.json ./

# RUN sed -i '/\"prepare\":/d' package.json
# RUN npm install --package-lock-only

# ##################
# # PREBUILD 
# ##################
# FROM node:16-alpine as prebuild
# WORKDIR /app

# COPY --from=dependencies /app/package.json ./
# COPY --from=dependencies /app/package-lock.json ./
# # RUN npm ci
# RUN npm i

# ###################
# # BUILD 
# ###################
# FROM node:16-alpine as build


# WORKDIR /app

# # Игнорируем src и prisma в .dockerignore, копируем остальные файлы
# # COPY / ./
# COPY --from=prebuild /app/node_modules ./node_modules
# # Копируем свежий и синхронизированный package-lock.json
# # COPY --from=dependencies app/package-lock.json ./
# # COPY --from=dependencies app/package.json ./

# # Отдельно копируем src и prisma
# # COPY /src ./src
# # COPY /.env.testing ./.env
# # COPY /startup.test.sh  ./startup.test.sh 
# # COPY /wait-for-it.sh   ./wait-for-it.sh 
# # COPY /prisma ./prisma
# # COPY /test ./test

# # ENV NODE_ENV testing

# # Установка зависимостей и сборка приложения
# # RUN npm ci --only=testing
# # RUN npm install
# RUN npx prisma generate
# RUN npm run build
# # RUN sleep 180
# # RUN exit 0

# # Генерация Prisma клиента
# # RUN npx prisma db push --accept-data-loss
# # RUN npx prisma migrate deploy


# ###################
# # testing
# ###################
# # Этап запуска
# FROM node:16-alpine
# RUN apk add --no-cache bash
# # RUN exit 0
# WORKDIR /app

# # Копирование собранного приложения и зависимостей из этапа сборки
# # COPY /app ./
# COPY --from=dependencies /app/package.json ./package.json
# COPY --from=build /app/node_modules ./node_modules
# COPY --from=build /app/dist ./dist
# COPY --from=build /app/prisma ./prisma
# COPY --from=build /app/src ./src
# COPY --from=build /app/test ./test
# COPY --from=build /app/.env.testing ./dist/.env
# COPY --from=build /app/.env.testing ./.env
# COPY --from=build /app/startup.test.sh ./startup.test.sh
# COPY --from=build /app/wait-for-it.sh  ./wait-for-it.sh 

# EXPOSE 3000
# RUN chmod +x /app/startup.test.sh
# ENTRYPOINT ["/app/startup.test.sh"]
















# # # Этап сборки
# # FROM node:16-alpine as build

# # WORKDIR /app

# # # Игнорируем src и prisma в .dockerignore, копируем остальные файлы
# # COPY app/ ./

# # # Отдельно копируем src и prisma
# # COPY app/src ./src/
# # COPY app/prisma ./prisma/

# # # Установка зависимостей и сборка приложения
# # RUN npm ci
# # RUN npm run build

# # # Генерация Prisma клиента
# # RUN npx prisma generate

# # # Этап запуска
# # FROM node:16-alpine

# # WORKDIR /app

# # # Копирование собранного приложения и зависимостей из этапа сборки
# # COPY --from=build /app/node_modules ./node_modules
# # COPY --from=build /app/dist ./dist
# # COPY --from=build /app/prisma ./prisma

# # # Копируем остальные необходимые файлы
# # # COPY --from=build /app ./

# # # Экспорт порта и запуск приложения
# # EXPOSE 3000
# # CMD ["node", "dist/main"]