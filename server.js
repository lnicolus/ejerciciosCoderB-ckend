import express from "express";
import { Server as http } from "http";
import { Server as ioServer } from "socket.io";
import { sqlite3Base, mariadbBase } from "./db/dbConnection.js";
import api from "./routes/api.js";
import { viewEngine as engine } from "./front/viewEngine.js";
import sockets from "./sockets/sockets.js";

const app = express();
app.use(express.static("public"));
app.use(api);
engine(app)
sockets(io);
mariadbBase.createDB();
sqlite3Base.createDB();

const httpserver = http(app);
export const io = new ioServer(httpserver);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

const server = httpserver.listen(PORT, () => {
  console.log(
    `Server active on PORT ${server.address().port}`
  );
});
httpserver.on("error", (error) => alert(`Error ${error}`));
