# Остановить скрипт при ошибке
$ErrorActionPreference = "Stop"

# Start-Sleep -Seconds 3

# & ".\terminate-server.ps1"
npx kill-port 3000

# Start-Sleep -Seconds 3

# Сброс и инициализация базы данных
Write-Host "Resetting and seeding database..."
# pnpm run db:reset:full
# pnr db:migrate:dev
# pnr db:push
pnr db:reset:force

# Start-Sleep -Seconds 10

# Запуск сервера в фоновом режиме
Write-Host "Starting server..."
$serverProcess = Start-Process -PassThru -NoNewWindow -FilePath "cmd" -ArgumentList "/c", "pnpm run dev"


# # Ждать запуска сервера
Write-Host "Waiting for server to start..."
Start-Sleep -Seconds 20 # несколько секунд для запуска сервера
Write-Host "Sleep ends"

# Запуск тестов
Write-Host "Running tests..."
pnpm run test
# Start-Sleep -Seconds 10


npx kill-port 3000
# & ".\terminate-server.ps1"








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