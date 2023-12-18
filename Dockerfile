# Этап генерации package-lock.json
FROM node:16-alpine as dependencies

WORKDIR /app

COPY app/package.json ./

# Установка зависимостей с помощью npm для генерации package-lock.json
RUN npm install --package-lock-only

# # Этап сборки
# FROM node:14-alpine as build

# WORKDIR /app

# # Копирование сгенерированного package-lock.json и package.json
# COPY --from=dependencies /app/package-lock.json ./


# Этап сборки
FROM node:16-alpine as build

WORKDIR /app

# Игнорируем src и prisma в .dockerignore, копируем остальные файлы
COPY --from=dependencies app/ ./

# Отдельно копируем src и prisma
COPY --from=dependencies app/src ./src/
COPY --from=dependencies app/prisma ./prisma/

# Установка зависимостей и сборка приложения
RUN npm ci
RUN npm run build

# Генерация Prisma клиента
RUN npx prisma generate

# Этап запуска
FROM node:16-alpine

WORKDIR /app

# Копирование собранного приложения и зависимостей из этапа сборки
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

# Копируем остальные необходимые файлы
# COPY --from=build /app ./

# Экспорт порта и запуск приложения
EXPOSE 3000
CMD ["node", "dist/main"]
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