#!/bin/bash
cd /root/memobox/backend/app

# Удаление старого package-lock.json если он существует
rm -f package-lock.json

# Генерация нового package-lock.json
npm i --package-lock-only