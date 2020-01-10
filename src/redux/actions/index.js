import axios from "axios";
import {
  websocketSendCommand,
  websocketClientSetup
} from "../../websocketClientUtils";
import uuidv4 from "uuid/v4";
import { payLoadTypeOutport } from "../reducers";

export const CHANGE_ZOOM = "CHANGE_ZOOM";
export const POSITION_NODE = "POSITION_NODE";
export const CREATE_NODE = "CREATE_NODE";
export const POSITION_EVERY_OTHER_NODE = "POSITION_EVERY_OTHER_NODE";
export const POSITION_TEXT_NODE = "POSITION_TEXT_NODE";
export const POSITION_IMG_NODE = "POSITION_IMG_NODE";
export const TOGGLE_GRAPHICS = "TOGGLE_GRAPHICS";
export const RESET_NORMAL = "RESET_NORMAL";
export const RESET_STRESS_TEST = "RESET_STRESS_TEST";
export const CONNECT_PORTS = "CONNECT_PORTS";
export const DELETE_SELECTED = "DELETE_SELECTED";
export const SELECT_NODE = "SELECT_NODE";
export const SELECT_CONNECTION = "SELECT_CONNECTION";
export const SELECT_CLEAR = "SELECT_CLEAR";
export const SET_NODE_TEMPLATE_LIST = "SET_NODE_TEMPLATE_LIST";
export const SET_CURRENT_SESSIONID = "SET_CURRENT_SESSIONID";
export const CONFIRM_NODE = "CONFIRM_NODE";
export const RECONNECT_SERVER = "RECONNECT_SERVER";
export const OUTPORT_DRAG_STARTED = "OUTPORT_DRAG_STARTED";
export const DRAG_CANCELLED = "DRAG_CANCELLED";
export const INPORT_DROP = "INPORT_DROP";
export const DRAG_MOUSE_POSITION = "DRAG_MOUSE_POSITION";
export const LOAD_STATE = "LOAD_STATE";
export const DRAG_STOP = "DRAG_STOP";
export const SET_GRAPH_FROM_SERVER = "SET_GRAPH_FROM_SERVER";

export const getGraphJSONFromServerAction = () => dispatch => {
  websocketSendCommand("getgraph", value => {
    console.log("answer", value);
    var json = JSON.parse(value.data);
    console.log("Response", json.type, json.graph);
    dispatch({
      type: SET_GRAPH_FROM_SERVER,
      graph: json.graph
    });
  });
};

export const zoomAction = percent => ({
  type: CHANGE_ZOOM,
  percent
});

export const deleteSelectedAction = () => ({
  type: DELETE_SELECTED
});

export const createNodeAction = (x, y, index, title) => dispatch => {
  var nodeId = uuidv4();
  dispatch({
    type: CREATE_NODE,
    x,
    y,
    index,
    nodeId
  });
  websocketSendCommand("addnode;" + nodeId + ";" + title, value => {
    console.log("answer", value);
    var json = JSON.parse(value.data);
    console.log("Response", json.type, json.nodeId, json.sessionId);
    dispatch({
      type: CONFIRM_NODE,
      nodeId: json.nodeId,
      sessionId: json.sessionId
    });
  });
};

export const selectNodeAction = nodeIndex => ({
  type: SELECT_NODE,
  nodeIndex
});

export const outportDragStartedAction = (nodeIndex, portIndex) => ({
  type: OUTPORT_DRAG_STARTED,
  nodeIndex,
  portIndex
});

export const inportDropAction = (
  nodeIndex,
  portIndex,
  isDragInProgress,
  dragPayload,
  fromNodeId,
  toNodeId
) => dispatch => {
  if (isDragInProgress && dragPayload.type === payLoadTypeOutport) {
    dispatch({ type: DRAG_CANCELLED });
    dispatch(
      connectPortsAction(
        dragPayload.nodeIndex,
        dragPayload.portIndex,
        nodeIndex,
        portIndex,
        fromNodeId,
        toNodeId
      )
    );
  }
};

export const dragMousePositionAction = (x, y) => ({
  type: DRAG_MOUSE_POSITION,
  x,
  y
});

export const dragCancelledAction = () => ({
  type: DRAG_CANCELLED
});

// This action exists for breaking POSITION_NODE grouping
// when user ends drag operations. Otherwise all consecutive
// drag operations will become one undo step.
export const dragStopAction = () => ({
  type: DRAG_STOP
});

export const selectClearAction = () => ({
  type: SELECT_CLEAR
});

export const selectConnectionAction = connectionIndex => ({
  type: SELECT_CONNECTION,
  connectionIndex
});

export const positionNodeAction = (index, position) => ({
  type: POSITION_NODE,
  index,
  position
});

export const positionEveryOtherNodeAction = (index, position) => ({
  type: POSITION_EVERY_OTHER_NODE,
  index,
  position
});

export const positionTextNodeAction = position => ({
  type: POSITION_TEXT_NODE,
  position
});

export const positionImgNodeAction = position => ({
  type: POSITION_IMG_NODE,
  position
});

export const toggleGraphicsLibraryAction = () => ({
  type: TOGGLE_GRAPHICS
});

export const resetStateNormalAction = () => ({
  type: RESET_NORMAL
});

export const resetStateStressTestAction = () => ({
  type: RESET_STRESS_TEST
});

export const connectPortsAction = (
  fromNodeIndex,
  fromPortIndex,
  toNodeIndex,
  toPortIndex,
  fromNodeId,
  toNodeId
) => dispatch => {
  dispatch({
    type: CONNECT_PORTS,
    fromNodeIndex,
    fromPortIndex,
    toNodeIndex,
    toPortIndex
  });

  websocketSendCommand(
    "addconnection;" +
      fromNodeId +
      ";" +
      fromPortIndex +
      ";" +
      toNodeId +
      ";" +
      toPortIndex,
    value => {
      console.log("answer", value);
      var json = JSON.parse(value.data);
      console.log("Response", json);
    }
  );
};

export const loadDefaultNodeTemplatesAsyncAction = () => dispatch => {
  console.log("loadDefaultNodeTemplatesAsyncAction");
  axios.get("templates/defaultNodes.json").then(response => {
    console.log(response);
    dispatch({
      type: SET_NODE_TEMPLATE_LIST,
      data: response.data
    });
  });
};

export const loadOtherNodeTemplatesAsyncAction = () => dispatch => {
  console.log("loadOtherNodeTemplatesAsyncAction");
  axios.get("templates/otherNodes.json").then(response => {
    console.log(response);
    dispatch({
      type: SET_NODE_TEMPLATE_LIST,
      data: response.data
    });
  });
};

export const storeCurrentSessionIDAction = sessionID => {
  console.log("set sessionID action", sessionID);
  return {
    type: SET_CURRENT_SESSIONID,
    id: sessionID
  };
};

export const reconnectAction = () => {
  console.log("reconnectAction");
  websocketClientSetup();
  return {
    type: RECONNECT_SERVER
  };
};

// Add unconfirmed nodes to server
export const syncAction = (currentSessionId, nodes) => dispatch => {
  // Filter out the nodes that are not confirmed in the current session adn add them to server
  var missingNodes = nodes.filter(node => {
    return node.nodeConfirmedInSessionWithID !== currentSessionId;
  });
  missingNodes.forEach(node => {
    websocketSendCommand("addnode;" + node.id + ";" + node.title, value => {
      console.log("answer", value);
      var json = JSON.parse(value.data);
      console.log("Response", json.type, json.nodeId, json.sessionId);
      dispatch({
        type: CONFIRM_NODE,
        nodeId: json.nodeId,
        sessionId: json.sessionId
      });
    });
  });
};

export const loadStateFromStringAction = string => ({
  type: LOAD_STATE,
  data: string
});
