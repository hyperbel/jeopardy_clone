#!/bin/sh

sudo pacman -Sy go sqlite3
go get -u
cat database.sql | sqlite3 database.db
go run .
