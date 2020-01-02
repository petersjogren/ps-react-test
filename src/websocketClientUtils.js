import { store } from "./index.js";
import { storeCurrentSessionIDAction } from "./redux/actions";

var connection;
var messageInProgress = false;
var messageQueue = [];
var successFunctionForMessageInProgress = null;

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
    store.dispatch(storeCurrentSessionIDAction(""));
  };

  connection.onerror = function(error) {
    // an error occurred when sending/receiving data
    window.alert(
      'Websocket test server not started: start with "node websocket-test-server.js"',
      error.type
    );
  };

  connection.onmessage = function(message) {
    console.log("sessionID: " + message.data);
    store.dispatch(storeCurrentSessionIDAction(message.data));

    // Reset onmessage handler to handle response messages
    connection.onmessage = function(message) {
      if (messageInProgress) {
        successFunctionForMessageInProgress(message);
        if (messageQueue.length > 0) {
          var nextCommand = messageQueue[0];
          messageQueue.shift();
          successFunctionForMessageInProgress = nextCommand.successFunction;
          connection.send(nextCommand.string);
        } else {
          messageInProgress = false;
        }
      }
    };
  };
}

export function websocketSendCommand(string, successFunction) {
  if (connection.readyState !== WebSocket.CLOSED) {
    if (messageInProgress) {
      messageQueue.push({
        string,
        successFunction
      });
    } else {
      successFunctionForMessageInProgress = successFunction;
      connection.send(string);
      messageInProgress = true;
    }
  } else {
    return "Error";
  }
}
