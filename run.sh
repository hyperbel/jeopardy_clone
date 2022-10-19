#!/bin/sh

pacman -Qs go >> /dev/null
if [ $? -eq 1 ]
then
  sudo pacman -Sy go
fi

pacman -Qs sqlite3 >> /dev/null

if [ $? -eq 1 ]
then
  sudo pacman -Sy go sqlite3
fi

if [ -f database.db ]
then
  cat restart.sql | sqlite3 database.db
else
  cat first.sql | sqlite3 database.db
fi
go get -u
go run .
