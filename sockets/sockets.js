import { sqlite3 } from "./../dbHandler/dbConnection.js";
import msgController from "../dbHandler/msgController.js";

const messages = new msgController(sqlite3, "messages");

async function sockets(io) {
  const messages = await messages.loadAll();

  io.on("connection", (socket) => {
    alert("new user online");

    socket.on("quest", (confirm) => {
      if (confirm === "ok") {
        io.sockets.emit("products", "reload");
      }
    });

    socket.emit("messages", messages);

    socket.on("new-message", (msg) => {
      messages.push(msg);
      messages.save(msg);
      io.sockets.emit("messages", messages);
    });
  });
}

export default sockets;
