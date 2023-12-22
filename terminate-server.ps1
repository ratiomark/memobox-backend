
# Остановка сервера после выполнения тестов
Write-Host "Stopping server..."
# Получение PID процесса, слушающего на порту 3000
$processInfo = netstat -ano | Select-String ":3000" | ForEach-Object {
    $line = $_.Line
    $parts = $line -split '\s+',0,[System.Text.RegularExpressions.RegexOptions]::RemoveEmptyEntries
    $parts[$parts.Length - 1]
}

# Удаление пустых строк и дубликатов PID
$processIds = $processInfo | Where-Object { $_ } | Sort-Object -Unique

# Завершение процессов, соответствующих найденным PID
foreach ($processId in $processIds) {
    if ($processId -and $processId -ne "0") {
        taskkill /F /PID $processId
        Write-Host "Успешно завершен процесс с PID $processId"
    }
    else {
        Write-Host "Пропущен процесс с PID $processId"
    }
}

Start-Sleep -Seconds 5 

Write-Host "Stopping db conection(probably)..."
$processInfo8000 = netstat -ano | Select-String ":8000" | ForEach-Object {
# $processInfo8000 = netstat -ano | Select-String ":8000\s+LISTENING" | ForEach-Object {
    $line = $_.Line
    $parts = $line -split '\s+',0,[System.Text.RegularExpressions.RegexOptions]::RemoveEmptyEntries
    $parts[$parts.Length - 1]
}

# Удаление пустых строк и дубликатов PID для порта 8000
$processIds8000 = $processInfo8000 | Where-Object { $_ } | Sort-Object -Unique

# Завершение процессов, соответствующих найденным PID для порта 8000
foreach ($processId in $processIds8000) {
    if ($processId -and $processId -ne "0") {
        taskkill /F /PID $processId
        Write-Host "Успешно завершен процесс с PID $processId на порту 8000"
    }
    else {
        Write-Host "Пропущен процесс с PID $processId на порту 8000"
    }
}
