#!/bin/sh

rm database.db
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

go get -u
cat database.sql | sqlite3 database.db
go run .
