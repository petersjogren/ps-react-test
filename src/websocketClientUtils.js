var connection;
var sessionID;

export function websocketClientSetup() {
  // if user is running mozilla then use it's built-in WebSocket
  window.WebSocket = window.WebSocket || window.MozWebSocket;

  connection = new WebSocket("ws://127.0.0.1:1337");
  console.log("websocket connection", connection);

  connection.onopen = function() {
    // connection is opened and ready to use
  };

  connection.onclose = function() {
    console.log("Connection closed");
    sessionID = "";
  };

  connection.onerror = function(error) {
    // an error occurred when sending/receiving data
    window.alert(
      'Websocket test server not started: start with "node websocket-test-server.js"',
      error.type
    );
  };

  connection.onmessage = function(message) {
    sessionID = message.data;
    console.log("sessionID: " + sessionID);
  };
}

export async function websocketSendCommand(string) {
  if (connection.readyState !== WebSocket.CLOSED) {
    var websocketPromise = new Promise(function(resolve, reject) {
      connection.onmessage = function(message) {
        console.log("got message", message);
        resolve(message);
      };
      connection.send(string);
    });
    return websocketPromise;
  } else {
    return "Error";
  }
}
