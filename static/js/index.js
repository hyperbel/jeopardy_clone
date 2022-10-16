
function joingame() {
  var name = document.getElementById("nameI").value;
  var gaid = document.getElementById("gameI").value;
  fetch(`/api/joinroom/${gaid}/${name}`).then((res) => res.json())
  .then((data) => {
    console.log(data)
    sessionStorage.setItem("roomID", gaid);
    sessionStorage.setItem("playerType", "player");
    window.location.href = `/room/${gaid}`  
  })
}

function creategame() {
  var name = document.getElementById("createName").value;
  fetch(`/api/creategame/${name}`).then((res) => res.json()).then((data) => {
    console.log(data);
    sessionStorage.setItem("roomID", data["roomID"]);
    sessionStorage.setItem("playerType", "host")
    window.location.href = `/room/${data["roomID"]}`
  })
}