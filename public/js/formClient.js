import socket from "./socketClientclient.js";

let option;

socket.on("input-res", (data) => {
  option = data;
});

let inputBtn = document.getElementById("input");
let modifyBtn = document.getElementById("modify");

inputBtn.onclick = () => input();
modifyBtn.onclick = () => modify();

function input() {
  if (!option) {
    option = true;
    socket.emit("input-req", option);
    location.reload();
  }
}
function modify() {
  if (option) {
    option = false;
    socket.emit("input-req", option);
    location.reload();
  }
}

let productForm = document.getElementById("productForm");
productForm.onsubmit = prevent.bind();

function prevent() {
  e.preventDefault();
  socket.emit("quest", "ok");
}
