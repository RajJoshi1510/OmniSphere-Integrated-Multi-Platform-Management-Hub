@echo off
echo ====================================================================
echo       Stopping all OmniSphere Enterprise background processes...
echo ====================================================================
taskkill /f /im node.exe 2>nul
echo Done! All services stopped and ports freed.
pause
