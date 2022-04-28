import socket from "./socketClient.js";

let messages = document.getElementById("messages");

socket.on("messages", (data) => {
  render(data);
});

const render = (data) => {
  let chat = data
    .map((msg) => {
      return `<b>${msg.mail}</b>
                <span class="text-blue-500">${msg.time} :</span>
                <i class="text-black">${msg.msg}</i><br>`;
    })
    .join(" ");
  messages.innerHTML = chat;
};

let chat = document.getElementById("chat");
chat.onsubmit = addMessage.bind();

function addMessage(e) {
  e.preventDefault();
  let tempMail = document.getElementById("username").value;
  let tempMessage = document.getElementById("message").value;
  if (tempMail !== "" && tempMessage !== "") {
    let message = {
      mail: tempMail,
      msg: tempMessage,
      time: `${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}`,
    };
    socket.emit("new-message", message);
    document.getElementById("message").value = "";
    document
      .getElementById("messages")
      .scrollTo({ behavior: "smooth", top: 9999999 });
  }
}
