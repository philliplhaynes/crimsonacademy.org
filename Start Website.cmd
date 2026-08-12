@echo off
setlocal
title Crimson Academy - website (live editing)

rem ---------------------------------------------------------------------------
rem  Double-click this file to run the website on this computer.
rem
rem  It starts a small web server and opens your browser at the site. Leave the
rem  black window open while you are looking at the site - closing it stops the
rem  server. Press Ctrl+C (or just close the window) when you are finished.
rem
rem  Use this one while EDITING: saved changes appear in the browser instantly.
rem  For the finished, optimised version use "View Built Website.cmd" instead.
rem
rem  Why a server at all, instead of just opening a page? See README-RUNNING.md
rem  in this folder - the short version is that a browser refuses to run this
rem  kind of site straight off the disk.
rem ---------------------------------------------------------------------------

cd /d "%~dp0crimsonacademy-site" || (
  echo Could not find the crimsonacademy-site folder next to this file.
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
echo   Starting the website. Your browser will open by itself.
echo   Keep this window open while you browse.
echo.

rem --open makes Vite launch the browser once the server is actually ready,
rem which avoids opening a tab at a port that is not listening yet.
call npm run dev -- --open

echo.
echo   The website has stopped.
pause
