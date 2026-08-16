@echo off
setlocal
title Crimson Academy - website (built version)

rem ---------------------------------------------------------------------------
rem  Double-click this file to see the FINISHED version of the website - the
rem  same files that would be uploaded to crimsonacademy.org, with images
rem  compressed and code minified.
rem
rem  It rebuilds the site, starts a small web server, and opens your browser.
rem  Leave the black window open while you browse; closing it stops the server.
rem
rem  Use "Start Website.cmd" instead if you are editing and want changes to
rem  appear as you save.
rem ---------------------------------------------------------------------------

cd /d "%~dp0" || (
  echo Could not find the folder this launcher lives in.
  pause
  exit /b 1
)

where node >nul 2>nul || (
  echo.
  echo   Node.js is not installed, and the website needs it to run.
  echo   Install it from https://nodejs.org  ^(pick the "LTS" version^),
  echo   then double-click this file again.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo.
  echo   First run - installing the website's building blocks.
  echo   This takes a few minutes and only ever happens once.
  echo.
  call npm install || (
    echo.
    echo   Install failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)

echo.
echo   Building the finished site. This takes about 15 seconds.
echo.
call npm run build || (
  echo.
  echo   The build failed - the messages above say why. Nothing was changed.
  pause
  exit /b 1
)

echo.
echo   Built. Opening the finished site in your browser.
echo   Keep this window open while you browse.
echo.

call npm run preview -- --open

echo.
echo   The website has stopped.
pause
