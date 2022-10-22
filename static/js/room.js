var ws = new WebSocket("ws://localhost:8080/ws")  
var peers = [];
const PLAYER_TYPE = sessionStorage.getItem("playerType");
const GAID = sessionStorage.getItem("roomID");

ws.addEventListener('open', (e) => {
  var name = sessionStorage.getItem("playerName");
  if (name != null)
    ws.send(JSON.stringify({
      "sendType": "join_game",
      "gameID": GAID,
      "message": {
        "playerName": name
      }
    }));
})

var p_c = 0;// player_count
var t = document.getElementById("playerT")
var h = t.createTHead();
var r = h.insertRow(0)




var board = document.getElementById("board");
var header = board.createTHead();
var row = header.insertRow(0);
var boardfileElement = document.getElementById('fileUpload');
boardfileElement.addEventListener('change', handleFiles, false);

if (PLAYER_TYPE == "player") boardfileElement.hidden = true;

function handleFiles() {
  const fileList = this.files;
  if (fileList.length != 1) { alert("please select a single file"); return}
  const boardf = fileList[0];
  var reader = new FileReader()
  reader.onload = function() {
    var b = JSON.parse(reader.result)
    handleBoard(b)
  }
  reader.readAsText(boardf)
}

function handleBoard(board) {
  var boardElement = document.getElementById("board");
  var row = boardElement.createTHead().insertRow(0);
  var headers = board["headers"]
  var cells = board["cells"]
  //headers
  for (var i = 0; i < headers.length; i++) {
    row.insertCell(i).innerHTML = `${headers[i]}`;
  }
  //rows in board json
  for (var j = 1; j < cells.length + 1; j++) {
    var trow = boardElement.insertRow(j);
    // cell in row
    for (var k = 0; k < cells[j-1].length; k++) {
      var s = cells[j-1][k]["points"]+"_"+cells[j-1][k]["awnser"];
      trow.insertCell(k).innerHTML = `<button id="${s}" class="cellButton btn btn-secondary">${cells[j-1][k]["points"]}</button>`;
    }
  }

  document.getElementById("tableDIV").hidden = false;
  document.getElementById("fileUpload").hidden = true;
      
  Array.from(document.getElementsByClassName("cellButton")).forEach((el) => {
    el.onclick = handleBtnClick
  })
}

function handleBtnClick() {
  var points = this.id.split('_')[0];
  var q = this.id.split('_')[1]
  document.getElementById("dialogtext").innerHTML = q;
  $( function() {
    $( '#dialog').dialog({
      buttons: [
        {
          text: "Falsch",
          click: function() {
            alert("punkte muessen noch gegeben werden")
            $(this).dialog("close");
          }
        },
        {
          text: "Richtig",
          click: function() {
            alert("punkte muessen noch gegeben werden")
            $(this).dialog("close");
          }
        }
      ]
    });
  });
}

function peer_joined(d) {
    r.insertCell(p_c).innerHTML = `${d["playerName"]}`
    peers.push(d["message"]["playerName"])
    p_c++;
    if (PLAYER_TYPE == "host") 
      ws.send(JSON.stringify({
          "sendType": "response_to_join",
          "gameID": GAID,
          "message": {
            "peers": peers
          }
        }
    ))
}


ws.addEventListener('message', (e) => {
  var d = JSON.parse(e.data)
  if (d["gameID"] != GAID) return;

  var s = d["sendType"];
  if (s == "join_game" && d["gameID"].value == GAID.value)
    peer_joined(d);
  if (s == "response_to_join" && d["gameID"].value == GAID) {
    console.log(d["message"]["peers"])
    peers = d["message"]["peers"]
  }
}) 