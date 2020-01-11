"use strict";

// Start with
// node websocket-test-server.js

/**
 * Global variables
 */
var nextNodeId = 1;
var storedNodes = [];
var storedConnections = [];
var sessionID = "";

var uuidv4 = require("uuid/v4");

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = "node-chat";
// Port where we'll run the websocket server
var webSocketsServerPort = 1337;
// websocket and http servers
var webSocketServer = require("websocket").server;
var http = require("http");

function nodeName(node) {
  return node.title + " " + node.nodeId.substring(node.nodeId.length - 4);
}

function dumpNodesToConsole() {
  console.log("\nAll nodes:");
  console.log("digraph G {");
  storedNodes.forEach(value => {
    console.log('"' + nodeName(value) + '"');
  });
  console.log("}");
}

function getGraphJSON() {
  const graph = {
    nodes: storedNodes.map(node => {
      return { id: node.nodeId, label: nodeName(node), color: "#90b141" };
    }),
    edges: storedConnections.map(connection => {
      return { from: connection.from, to: connection.to };
    })
  };
  return graph;
}

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
  var userName = false;
  var userColor = false;
  console.log(new Date() + " Connection accepted.");
  sessionID = uuidv4();
  storedNodes = [];
  storedConnections = [];
  connection.send(sessionID);

  // user sent some message
  connection.on("message", function(message) {
    if (message.type === "utf8") {
      // accept only text
      {
        // log and broadcast the message
        console.log(
          new Date() + " Received Message " + ": " + message.utf8Data
        );

        var commandArray = message.utf8Data.split(";");
        var responseJSON = {};

        switch (commandArray[0]) {
          case "addnode":
            responseJSON = {
              type: "NODE_ADDED",
              nodeId: commandArray[1],
              sessionId: sessionID
            };
            storedNodes.push({
              title: commandArray[2],
              nodeId: commandArray[1]
            });
            dumpNodesToConsole();
            break;
          case "addconnection":
            // addconnection;fromNodeId;fromNodePortIndex;toNodeId;toNodePortIndex
            responseJSON = {
              type: "CONNECTION_ADDED",
              sessionId: sessionID,
              fromNodeId: commandArray[1],
              toNodeId: commandArray[3]
            };
            storedConnections.push({
              from: commandArray[1],
              to: commandArray[3]
            });
            dumpNodesToConsole();
            break;
          case "getgraph":
            responseJSON = {
              type: "SERVER_GRAPH",
              graph: getGraphJSON()
            };
            break;
          default:
            responseJSON = {
              type: "ERROR",
              message: 'Invalid command: "' + message.utf8Data + '"'
            };
            break;
        }

        setTimeout(function() {
          connection.send(JSON.stringify(responseJSON));
        }, 100); // in milliseconds
      }
    }
  });
  // user disconnected
  connection.on("close", function(connection) {
    console.log(
      new Date() + " Peer " + connection.remoteAddress + " disconnected."
    );
  });
});
