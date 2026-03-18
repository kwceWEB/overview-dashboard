@echo off
title Life+ Local Server

echo.
echo  Liberation du port 3000...
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":3000 "') do (
  taskkill /F /PID %%a >nul 2>&1
)
timeout /t 1 /nobreak >nul

echo  Demarrage Life+...
echo  Ouvre http://localhost:3000 dans ton navigateur
echo.
start "" http://localhost:3000
node "%~dp0server.js"
pause
