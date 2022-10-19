package main

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"math/rand"
	"net/http"
	"github.com/olahol/melody"
)

func main() {
	r := gin.Default()
	m := melody.New()

	r.Use(gin.Logger())

	r.LoadHTMLGlob("static/html/*")
	r.Static("/static/js", "static/js")

	r.GET("/", index)
	r.GET("/room/:id", ingame)
	r.GET("/api/creategame/:host", creategame)
	r.GET("/api/joinroom/:id/:name", joinroom)
	r.GET("/ws", func(c *gin.Context) {
		m.HandleRequest(c.Writer, c.Request)
	})
	
	m.HandleMessage(func (s *melody.Session, msg []byte) {
		m.BroadCast(msg)
	})

	r.Run()
}

func joinroom(c *gin.Context) {
	id := c.Param("id")
	na := c.Param("name")
	pid := rand.Intn(99999)
	db, err := sql.Open("sqlite3", "./database.db")
	checkErr(err)
	res, err := db.Exec("INSERT INTO Players VALUES(?, ?,?);", pid, id, na)
	checkErr(err)
	fmt.Println(res)
	c.JSON(http.StatusOK, gin.H{"res": res, "pID": pid, "name": na})
}

func creategame(c *gin.Context) {
	host := c.Param("host")
	id := rand.Intn(9999)
	fmt.Println("[LOG] created game with ID: ", id)
	db, err := sql.Open("sqlite3", "./database.db")
	checkErr(err)
	res, err := db.Exec("INSERT INTO Games VALUES(?,?);", id, host)
	checkErr(err)
	c.JSON(http.StatusOK, gin.H{"roomID": id, "res": res})
}

func ingame(c *gin.Context) {
	c.HTML(http.StatusOK, "ingame.html", gin.H{
		"content": "in game page",
	})
}

func index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"content": "index page",
	})
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
