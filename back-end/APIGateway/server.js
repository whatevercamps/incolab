const http = require("http");
var app = require("./routes");

const PORT = process.env.PORT || 8080;

var server = http.createServer(app);

server.listen(PORT);
server.on("error", onErrorHandler);
server.on("listening", function () {
  console.log(`APIGateway Micro Service listening on ${PORT}`);
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
