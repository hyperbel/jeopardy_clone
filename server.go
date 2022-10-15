package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"net/http"
	"fmt"
)

func main() {
	r := gin.Default()

	r.Use(gin.Logger())
	
	r.LoadHTMLGlob("static/html/*")
	r.Static("/static/js", "static/js")
	
	r.GET("/", index)
	r.GET("/ingame", ingame)
	r.GET("/ws", wsh)
	
	r.Run()
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