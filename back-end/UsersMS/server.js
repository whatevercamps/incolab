"use strict";

const dotenv = require("dotenv");
dotenv.config();

var app = require("./controller");
var http = require("http");

const PORT = process.env.PORT || 3030;
app.set("port", PORT);

var server = http.createServer(app);

server.listen(PORT);
server.on("error", onErrorHandler);
server.on("listening", function () {
  console.log(`Users Service listening on ${PORT}`);
});

function onErrorHandler(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + PORT : "Port " + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
