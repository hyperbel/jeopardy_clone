url = "ws://localhost:8080/ws"
w = new WebSocket(url);
w.addEventListener('open', onopen )
w.addEventListener('message', onmessage)

function onmessage (msg) {
  $("#output").append(`${(new Date())} <<< ${msg.data}\n`)
}

function onopen() {
  w.send("ping")
}


var board = document.getElementById("board");
var header = board.createTHead();
var row = header.insertRow(0);
var boardfileElement = document.getElementById('fileUpload');
boardfileElement.addEventListener('change', handleFiles, false);

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


