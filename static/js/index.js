/*
url = "ws://localhost:8080/ws"
w = new WebSocket(url);

w.addEventListener('open', onopen )
w.addEventListener('message', onmessage)


function onmessage (msg) {
  $("#output").append(`${(new Date())} <<< ${msg.data}\n`)
}

function onopen() {
  setInterval(function() {
    w.send("ping")
    $("#output").append(`${(new Date())} >>> ping\n`)
  }, 10000)
}
*/
function joingame() {
  console.log("join gmae pressed")
  var name = document.getElementById("nameI").value;
  console.log(name)
}