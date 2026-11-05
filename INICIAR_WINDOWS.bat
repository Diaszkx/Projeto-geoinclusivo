@echo off
cd /d "%~dp0"
where npm >nul 2>nul
if errorlevel 1 (echo Instale Node.js LTS primeiro. & pause & exit /b 1)
if not exist "frontend\node_modules" (call npm install & if errorlevel 1 (pause & exit /b 1))
if not exist "backend\node_modules" (call npm install & if errorlevel 1 (pause & exit /b 1))
call npm start
pause
