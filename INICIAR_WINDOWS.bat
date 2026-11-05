@echo off
cd /d "%~dp0"
title GeoInclusivo - Inicializacao
where npm >nul 2>nul
if errorlevel 1 (echo Node.js nao encontrado. Instale Node.js LTS. & pause & exit /b 1)
if not exist "frontend\node_modules" (
 echo Instalando dependencias pela primeira vez...
 call npm install
 if errorlevel 1 (echo Falha na instalacao. & pause & exit /b 1)
)
if not exist "backend\node_modules" (
 echo Instalando dependencias...
 call npm install
 if errorlevel 1 (echo Falha na instalacao. & pause & exit /b 1)
)
echo Iniciando GeoInclusivo...
call npm start
pause
