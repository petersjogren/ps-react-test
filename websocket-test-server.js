"use strict";

// Start with
// node websocket-test-server.js

var nextNodeId = 1;
var nodes = [];

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = "node-chat";
// Port where we'll run the websocket server
var webSocketsServerPort = 1337;
// websocket and http servers
var webSocketServer = require("websocket").server;
var http = require("http");
/**
 * Global variables
 */
// latest 100 messages
var history = [];
// list of currently connected clients (users)
var clients = [];

/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server,
  // not HTTP server
});
server.listen(webSocketsServerPort, function() {
  console.log(
    new Date() + " Server is listening on port " + webSocketsServerPort
  );
});
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request. For more info
  // http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});
// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on("request", function(request) {
  console.log(new Date() + " Connection from origin " + request.origin + ".");
  // accept connection - you should check 'request.origin' to
  // make sure that client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  var connection = request.accept(null, request.origin);
  // we need to know client index to remove them on 'close' event
  var index = clients.push(connection) - 1;
  var userName = false;
  var userColor = false;
  console.log(new Date() + " Connection accepted.");
  // send back chat history
  if (history.length > 0) {
    connection.sendUTF(JSON.stringify({ type: "history", data: history }));
  }
  // user sent some message
  connection.on("message", function(message) {
    if (message.type === "utf8") {
      // accept only text
      {
        // log and broadcast the message
        console.log(
          new Date() + " Received Message " + ": " + message.utf8Data
        );

        var commandArray = message.utf8Data.split(" ");
        var responseJSON = {};
        switch (commandArray[0]) {
          case "addnode":
            responseJSON = {
              type: "NODE_ADDED",
              id: nextNodeId++
            };
            break;
          default:
            responseJSON = {
              type: "ERROR",
              message: 'Invalid command: "' + message.utf8Data + '"'
            };
            break;
        }

        connection.send(JSON.stringify(responseJSON));
      }
    }
  });
  // user disconnected
  connection.on("close", function(connection) {
    if (userName !== false && userColor !== false) {
      console.log(
        new Date() + " Peer " + connection.remoteAddress + " disconnected."
      );
      // remove user from the list of connected clients
      clients.splice(index, 1);
      // push back user's color to be reused by another user
      colors.push(userColor);
    }
  });
});
