const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const cors = require("cors");
const methodOverride = require("method-override");
const mongoosedb = require("./db/mongoose");
const config = require("./config");
const PORT = process.env.PORT || 5000;
const ApiRouter = require("./routes/Api");

// mongoosedb()
app.use(cors());
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

io.on("connection", (socket) => {
  console.log("New WS Connection...");
  socket.on("Input Chat Message", (msg) => {});

  socket.on("disconnect", () => {
    console.log("User had left..");
  });
});

app.use("/api", ApiRouter);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
