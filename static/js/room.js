var ws = new WebSocket("ws://localhost:8080/ws")  

ws.addEventListener('open', (e) => {
  var name = sessionStorage.getItem("playerName");
  if (name != null)
    ws.send(JSON.stringify({
      "playerName": name,
      "playerId": sessionStorage.getItem("pid")
    }))
})

ws.addEventListener('message', (e) => {
  console.log(JSON.parse(e.data))
}) 
