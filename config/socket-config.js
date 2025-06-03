var express = require("express");
var server = require("http").createServer(express);

var io = require("socket.io")(server, {
  origins: "*.*",
  pingInterval: 5000,
  pingTimeout: 25000,
  // transports: ["websocket"],
});

server.listen(5000);

/* io.connect = async function () {
  io.on(
    "connection",
    await function (socket) {
      socket.emit("news", {
        test: "xyz",
      });
      socket.on("my other event", function (data) {});
    }
  );
}; */

var io_socket = io.on("connection", async function (socket) {
  console.log("new connection from config port : ", 5000);

  socket.emit(`handShaking`, "welcome");
  socket.on("order-events", (data) => {
    console.log("new order-events occurs", data);
  });
  return socket;
});

module.exports = io;
global.io_test = io;
global.io_socket = io_socket;
