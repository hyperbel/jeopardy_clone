
function joingame() {
  var name = document.getElementById("nameI").value;
  
}

function creategame() {
  var name = document.getElementById("createName").value;
  fetch('/api/creategame').then((res) => res.json()).then((data) => {
    console.log(data);
    sessionStorage.setItem("roomID", data["roomID"]);
    sessionStorage.setItem("playerType", "host")
    window.location.href = `/room/${data["roomID"]}`
  })
}