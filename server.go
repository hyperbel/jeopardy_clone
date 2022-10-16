package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"net/http"
	"fmt"
	"math/rand"
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	r := gin.Default()

	r.Use(gin.Logger())
	
	r.LoadHTMLGlob("static/html/*")
	r.Static("/static/js", "static/js")
	
	r.GET("/", index)
	r.GET("/room/:id", ingame)
	r.GET("/ws", wsh)
	r.GET("/api/creategame/:host", creategame)
	r.GET("/api/joinroom/:id", joinroom)
	
	r.Run()
}

func joinroom(c *gin.Context) {
//	id := c.Param("id")
//	db, err := sql.Open("sqlite3", "./database.db")
//	checkErr(err)
}

func creategame(c *gin.Context) {
	host := c.Param("host")
	id := rand.Intn(9999)
	fmt.Println("[LOG] created game with ID: ", id)
	db, err := sql.Open("sqlite3", "./database.db")
    checkErr(err)
	res, err := db.Exec("INSERT INTO Games VALUES(?,?);",id,host) 
	checkErr(err)
	c.JSON(http.StatusOK, gin.H{"roomID": id, "res": res})
}

func ingame(c *gin.Context) {
	c.HTML(http.StatusOK, "ingame.html", gin.H{
		"content": "in game page",
	})
}

func wsh(c *gin.Context) {
	wshandler(c.Writer, c.Request)
}

func index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"content":"index page",
	})
}

var wsupgrader = websocket.Upgrader {
	ReadBufferSize:		1024,
	WriteBufferSize:	1024,
}

func wshandler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Failed to set websocket upgrade: %+v", err)
		return
	}
	
	for {
		t, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}
		conn.WriteMessage(t, msg)
	}
}

func checkErr(err error) {
    if err != nil {
        panic(err)
    }
}
