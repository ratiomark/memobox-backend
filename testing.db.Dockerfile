# Используйте базовый образ PostgreSQL
FROM postgres:16-alpine
RUN mkdir -p /backups