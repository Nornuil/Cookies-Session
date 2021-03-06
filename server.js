const express = require("express");
require("dotenv").config();
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const productos = require("./routes/productos");
const mensajes = require("./routes/mensajes");
const login = require("./routes/login");
const PORT = process.env.PORT || 8080;
const { dbConnection } = require("./database/config");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
const httpServer = new HttpServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const io = new IOServer(httpServer);
app.io = io;

app.use(
  session({
    // store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_CONEX }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

app.use("/api", productos);
app.use("/api", mensajes);
app.use("/api", login);

conexDB();

async function conexDB() {
  await dbConnection(process.env.DB);
}

io.on("connection", async (socket) => {
  console.log("Cliente conectado con id: ", socket.id);
  //CHAT
  socket.on("new_message", async (data) => {
    io.sockets.emit("messages_received");
  });
  io.sockets.emit("messages_received");
});

const server = httpServer.listen(PORT, () =>
  console.log(`Servidor listo en el puerto ${PORT} ...`)
);

server.on("error", (error) =>
  console.log(`Error en el servidor... Error: ${error}`)
);
