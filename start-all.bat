@echo off
cd /d "%~dp0"
title OmniSphere Enterprise Platform — 5-in-1 MERN Suite
color 0B
echo ====================================================================
echo             🌟 OMNISPHERE ENTERPRISE PLATFORM 🌟
echo      Car Rental | Hotel Booking | E-Commerce | Social Media | Food Delivery
echo ====================================================================
echo.
echo [1/2] Checking MongoDB service...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [OK] MongoDB is already running on port 27017!
) else (
    echo [*] Starting local MongoDB server on port 27017...
    if not exist "C:\data\db" mkdir "C:\data\db"
    start /B "" "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"
    timeout /t 3 /nobreak >nul
    echo [OK] MongoDB started successfully!
)
echo.
echo [2/2] Launching all 5 projects concurrently via Process Supervisor...
echo.
node runner.js
pause
