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
  var name = document.getElementById("nameI").value;
  
}

function creategame() {
  var name = document.getElementById("createName").value;
  fetch('/api/creategame').then((res) => res.json()).then((data) => {
    console.log(data);
  })
}