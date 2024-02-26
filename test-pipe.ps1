# Остановить скрипт при ошибке
$ErrorActionPreference = "Stop"

# Остановка предыдущего сервера, если он запущен
& ".\terminate-server.ps1"

# Сброс и инициализация базы данных
Write-Host "Resetting and seeding database..."
pnr db:reset:force

# Запуск сервера в фоновом режиме с перенаправлением вывода в файл
Write-Host "Starting server..."
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList "-Command", "pnpm run dev > back-test.log 2>&1"

# Запуск сервера в фоновом режиме, без перенаправления вывода
# Write-Host "Starting server..."
# $serverProcess = Start-Process -PassThru -NoNewWindow -FilePath "cmd" -ArgumentList "/c", "pnpm run dev"

# Ждать запуска сервера
Write-Host "Waiting for server to start..."
Start-Sleep -Seconds 10 # Пауза для запуска сервера
Write-Host "Server should be up"

# Запуск тестов с выводом в консоль
Write-Host "Running tests..."
pnpm run test

# Остановка сервера после выполнения тестов
& ".\terminate-server.ps1"



# $processInfo = netstat -ano | Select-String ":3000" | ForEach-Object {
#     $line = $_.Line
#     $parts = $line -split '\s+',0,[System.Text.RegularExpressions.RegexOptions]::RemoveEmptyEntries
#     $parts[$parts.Length - 1]
# }

# # Удаление пустых строк, дубликатов PID и исключение PID с идентификатором 0
# $processIds = $processInfo | Where-Object { $_ -and $_ -ne "0" } | Sort-Object -Unique

# # Завершение процессов, соответствующих найденным PID
# foreach ($processId in $processIds) {
#     if ($processId) {
#         taskkill /F /PID $processId
#         Write-Host "Успешно завершен процесс с PID $processId"
#     }
# }

# Write-Host "Stopping db conection(probably)..."
# $processInfoDb = netstat -ano | Select-String ":8000" | ForEach-Object {
#     $lineDb = $_.Line
#     $partsDb = $lineDb -split '\s+',0,[System.Text.RegularExpressions.RegexOptions]::RemoveEmptyEntries
#     $partsDb[$partsDb.Length - 1]
# }

# # Удаление пустых строк и дубликатов PID
# $processIdsDb = $processInfoDb | Where-Object { $_ } | Sort-Object -Unique

# # Завершение процессов, соответствующих найденным PID
# foreach ($processIdDb in $processIdsDb) {
#     if ($processIdDb) {
#         taskkill /F /PID $processIdDb
#         Write-Host "Успешно завершен процесс с PID $processIdDb"
#     }
# }