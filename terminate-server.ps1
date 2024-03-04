Write-Host "Stopping server..."

# Определение процессов, использующих порт 3000
$port3000Processes = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique

# Завершение процессов на порту 3000
foreach ($processId in $port3000Processes) {
    $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
    if ($process) {
        $process | Stop-Process -Force -PassThru | Out-Null
        Write-Host "Процесс с PID $processId на порту 3000 успешно завершен."
    } else {
        Write-Host "Процесс с PID $processId не найден."
    }
}


$port8000Processes = Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique

# Завершение процессов на порту 3000
foreach ($processId in $port3000Processes) {
    $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
    if ($process) {
        $process | Stop-Process -Force -PassThru | Out-Null
        Write-Host "Процесс с PID $processId на порту 3000 успешно завершен."
    } else {
        Write-Host "Процесс с PID $processId не найден."
    }
}

Write-Host "Все процессы на портах 3000 и 8000 были проверены и завершены."

# # Остановка сервера после выполнения тестов
# Write-Host "Stopping server..."
# # Получение PID процесса, слушающего на порту 3000
# $processInfo = netstat -ano | Select-String ":3000" | ForEach-Object {
#     $line = $_.Line
#     $parts = $line -split '\s+',0,[System.Text.RegularExpressions.RegexOptions]::RemoveEmptyEntries
#     $parts[$parts.Length - 1]
# }

# # Удаление пустых строк и дубликатов PID
# $processIds = $processInfo | Where-Object { $_ } | Sort-Object -Unique

# # Завершение процессов, соответствующих найденным PID
# foreach ($processId in $processIds) {
#     if ($processId -and $processId -ne "0") {
#         taskkill /F /PID $processId
#         Write-Host "Успешно завершен процесс с PID $processId"
#     }
#     else {
#         Write-Host "Пропущен процесс с PID $processId"
#     }
# }

# Start-Sleep -Seconds 2

# Write-Host "Stopping db conection(probably)..."
# $processInfo8000 = netstat -ano | Select-String ":8000" | ForEach-Object {
# # $processInfo8000 = netstat -ano | Select-String ":8000\s+LISTENING" | ForEach-Object {
#     $line = $_.Line
#     $parts = $line -split '\s+',0,[System.Text.RegularExpressions.RegexOptions]::RemoveEmptyEntries
#     $parts[$parts.Length - 1]
# }

# # Удаление пустых строк и дубликатов PID для порта 8000
# $processIds8000 = $processInfo8000 | Where-Object { $_ } | Sort-Object -Unique

# # Завершение процессов, соответствующих найденным PID для порта 8000
# foreach ($processId in $processIds8000) {
#     if ($processId -and $processId -ne "0") {
#         taskkill /F /PID $processId
#         Write-Host "Успешно завершен процесс с PID $processId на порту 8000"
#     }
#     else {
#         Write-Host "Пропущен процесс с PID $processId на порту 8000"
#     }
# }
