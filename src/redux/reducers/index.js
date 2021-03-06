import InitialState from "../../InitialState";
import update from "immutability-helper";
import {
  CHANGE_ZOOM,
  DELETE_SELECTED,
  SELECT_NODE,
  SELECT_CONNECTION,
  SELECT_CLEAR,
  POSITION_NODE,
  POSITION_EVERY_OTHER_NODE,
  TOGGLE_GRAPHICS,
  RESET_NORMAL,
  RESET_STRESS_TEST,
  CONNECT_PORTS,
  CREATE_NODE,
  SET_NODE_TEMPLATE_LIST,
  SET_CURRENT_SESSIONID,
  CONFIRM_NODE,
  CONFIRM_CONNECTION,
  RECONNECT_SERVER,
  OUTPORT_DRAG_STARTED,
  DRAG_CANCELLED,
  INPORT_DROP,
  DRAG_MOUSE_POSITION,
  LOAD_STATE,
  DRAG_STOP,
  SET_GRAPH_FROM_SERVER
} from "../actions";
import { invalidMousePosition } from "../../InitialState";
import { nodeDiffSinceLast } from "../../server";

export const payLoadTypeOutport = "FROM_OUTPORT";

function findNodeIndexWithId(state, id) {
  var foundIndex = -1;
  state.nodes.forEach((value, index) => {
    if (value.id === id) {
      foundIndex = index;
    }
  });
  return foundIndex;
}

function findConnectionIndexesWithIds(state, fromNodeId, toNodeId) {
  var indexes = state.connections
    .map((c, ci) =>
      state.nodes[c.from.nodeIndex].id === fromNodeId &&
      state.nodes[c.to.nodeIndex].id === toNodeId
        ? ci
        : -1
    )
    .filter(i => i !== -1);
  return indexes;
}

function connectPorts(
  state,
  fromNodeIndex,
  fromPortIndex,
  toNodeIndex,
  toPortIndex
) {
  return update(state, {
    connections: {
      $push: [
        {
          isSelected: false,
          from: {
            nodeIndex: fromNodeIndex,
            index: fromPortIndex
          },
          to: {
            nodeIndex: toNodeIndex,
            index: toPortIndex
          }
        }
      ]
    }
  });
}

function clearDragState(state) {
  return update(state, {
    isDragInProgress: {
      $set: false
    },
    dragMousePosition: {
      x: { $set: invalidMousePosition },
      y: { $set: invalidMousePosition }
    },
    dragPayload: { $set: {} }
  });
}

export default function graphEditorReducer(
  state = InitialState(false),
  action
) {
  //  console.log("graphEditorReducer", action);
  var newState;
  //  console.log("state before ", state);
  var deltaX;
  var deltaY;
  var updateObject;
  var oldSessionId;

  switch (action.type) {
    case LOAD_STATE:
      var currentSession = state.currentSessionID;
      newState = JSON.parse(action.data);
      newState = update(newState, {
        currentSessionID: { $set: currentSession }
      });
      break;
    case CHANGE_ZOOM:
      newState = update(state, { scale: { $set: action.percent / 100 } });
      break;
    case DELETE_SELECTED:
      console.log("DELETE_SELECTED");
      newState = state;
      // Delete all selected nodes and all selected connections.
      // Remember to also delete all connections that goes from or to a deleted node.
      // Also remember to update all indexes of connections to the new node indexes.
      var i;
      var connIdx;
      var wasSomethingDeleted;
      var wasConnectionDeleted;

      // Delete selected nodes
      wasSomethingDeleted = true;
      while (wasSomethingDeleted) {
        wasSomethingDeleted = false;
        for (i = 0; i < newState.nodes.length; i++) {
          if (newState.nodes[i].isSelected) {
            // Delete at a specific index, no matter what value is in it
            newState = update(newState, { nodes: { $splice: [[i, 1]] } });

            // Remove connections to/from the deleted node
            wasConnectionDeleted = true;
            while (wasConnectionDeleted) {
              wasConnectionDeleted = false;
              for (
                connIdx = 0;
                connIdx < newState.connections.length;
                connIdx++
              ) {
                if (
                  newState.connections[connIdx].from.nodeIndex === i ||
                  newState.connections[connIdx].to.nodeIndex === i
                ) {
                  newState = update(newState, {
                    connections: { $splice: [[connIdx, 1]] }
                  });
                  wasConnectionDeleted = true;
                  break;
                }
              }
            }

            // Decrement node indexes in connections by one if > i
            updateObject = {};
            // eslint-disable-next-line
            newState.connections.map((value, index) => {
              updateObject[index] = {
                to: {
                  nodeIndex: {
                    $set:
                      value.to.nodeIndex > i
                        ? value.to.nodeIndex - 1
                        : value.to.nodeIndex
                  }
                },
                from: {
                  nodeIndex: {
                    $set:
                      value.from.nodeIndex > i
                        ? value.from.nodeIndex - 1
                        : value.from.nodeIndex
                  }
                }
              };
              return null;
            });
            newState = update(newState, {
              connections: {
                ...updateObject
              }
            });

            wasSomethingDeleted = true;
            break;
          }
        }
      }

      // Delete selected connections
      wasSomethingDeleted = true;
      while (wasSomethingDeleted) {
        wasSomethingDeleted = false;
        for (i = 0; i < newState.connections.length; i++) {
          if (newState.connections[i].isSelected) {
            // Delete at a specific index, no matter what value is in it
            newState = update(newState, { connections: { $splice: [[i, 1]] } });
            wasSomethingDeleted = true;
            break;
          }
        }
      }
      nodeDiffSinceLast(newState);
      break;
    case SELECT_NODE:
      console.log("SELECT_NODE", action.nodeIndex, state);
      newState = update(state, {
        nodes: {
          [action.nodeIndex]: {
            isSelected: { $set: true }
          }
        }
      });
      break;
    case CREATE_NODE:
      console.log("CREATE_NODE", action.x, action.y, action);
      newState = update(state, {
        nodes: { $push: [state.nodeTemplates[action.index]] }
      });
      newState = update(newState, {
        nodes: {
          [newState.nodes.length - 1]: {
            position: {
              x: {
                $set: action.x - state.nodeTemplates[action.index].width / 2
              },
              y: { $set: action.y - 10 }
            },
            id: { $set: action.nodeId }
          }
        }
      });
      console.log("state after ", newState);
      nodeDiffSinceLast(newState);
      break;
    case DRAG_STOP:
      newState = state;
      break;
    case CONFIRM_NODE:
      console.log("CONFIRM_NODE", action.nodeId, action.sessionId, action);
      var nodeIndex = findNodeIndexWithId(state, action.nodeId);
      console.log("nodeIndex", nodeIndex);
      newState = update(state, {
        currentSessionID: { $set: action.sessionId },
        nodes: {
          [nodeIndex]: {
            nodeConfirmedInSessionWithID: { $set: action.sessionId }
          }
        }
      });
      break;
    case CONFIRM_CONNECTION:
      console.log("CONFIRM_CONNECTION", action.sessionId, action);
      newState = state;
      var connectionIndexes = findConnectionIndexesWithIds(
        state,
        action.fromNodeId,
        action.toNodeId
      );
      console.log("connectionIndexes", connectionIndexes);
      connectionIndexes.forEach(ci => {
        newState = update(newState, {
          currentSessionID: { $set: action.sessionId },
          connections: {
            [ci]: {
              confirmedInSessionWithID: { $set: action.sessionId }
            }
          }
        });
      });
      break;
    case OUTPORT_DRAG_STARTED:
      console.log("OUTPORT_DRAG_STARTED", action.nodeIndex, action.portIndex);
      newState = update(state, {
        isDragInProgress: {
          $set: true
        },
        dragPayload: {
          $set: {
            type: payLoadTypeOutport,
            nodeIndex: action.nodeIndex,
            portIndex: action.portIndex
          }
        }
      });
      break;
    case INPORT_DROP:
      console.log("INPORT_DROP", action.nodeIndex, action.portIndex);
      newState = state;
      if (
        state.isDragInProgress &&
        state.dragPayload.type === payLoadTypeOutport
      ) {
        newState = connectPorts(
          newState,
          state.dragPayload.nodeIndex,
          state.dragPayload.portIndex,
          action.nodeIndex,
          action.portIndex
        );
      }
      newState = clearDragState(newState);
      nodeDiffSinceLast(newState);
      break;
    case DRAG_CANCELLED:
      // console.log("DRAG_CANCELLED");
      newState = clearDragState(state);
      break;
    case DRAG_MOUSE_POSITION:
      // console.log("DRAG_MOUSE_POSITION", action.x, action.y);
      newState = update(state, {
        dragMousePosition: {
          x: { $set: action.x },
          y: { $set: action.y }
        }
      });
      break;
    case SELECT_CONNECTION:
      // console.log("SELECT_CONNECTION", action.connectionIndex);
      newState = update(state, {
        connections: {
          [action.connectionIndex]: {
            isSelected: { $set: true }
          }
        }
      });
      break;
    case SELECT_CLEAR:
      // console.log("SELECT_CLEAR");
      updateObject = {};
      state.nodes.map((value, index) => {
        updateObject[index] = {
          isSelected: { $set: false }
        };
        return null;
      });
      newState = update(state, {
        nodes: {
          ...updateObject
        }
      });

      updateObject = {};
      state.connections.map((value, index) => {
        updateObject[index] = {
          isSelected: { $set: false }
        };
        return null;
      });
      newState = update(newState, {
        connections: {
          ...updateObject
        }
      });
      break;
    case POSITION_NODE:
      newState = update(state, {
        nodes: {
          [action.index]: {
            position: {
              x: { $set: action.position.x },
              y: { $set: action.position.y }
            }
          }
        }
      });
      break;
    case POSITION_EVERY_OTHER_NODE:
      deltaX = action.position.x - state.nodes[action.index].position.x;
      deltaY = action.position.y - state.nodes[action.index].position.y;
      updateObject = {};
      state.nodes.map((value, index) => {
        if (index % 2 === 0) {
          updateObject[index] = {
            position: {
              x: { $set: state.nodes[index].position.x + deltaX },
              y: { $set: state.nodes[index].position.y + deltaY }
            }
          };
        }
        return null;
      });
      newState = update(state, {
        nodes: {
          [action.index]: {
            position: {
              x: { $set: action.position.x },
              y: { $set: action.position.y }
            }
          },
          ...updateObject
        }
      });
      break;
    case TOGGLE_GRAPHICS:
      var newValue = state.pureHTMLgraph ? false : true;
      newState = update(state, {
        pureHTMLgraph: { $set: newValue }
      });
      break;
    case RESET_NORMAL:
      oldSessionId = state.currentSessionID;
      newState = InitialState(false);
      newState = update(newState, {
        currentSessionID: { $set: oldSessionId }
      });
      break;
    case RESET_STRESS_TEST:
      oldSessionId = state.currentSessionID;
      newState = InitialState(true);
      newState = update(newState, {
        currentSessionID: { $set: oldSessionId }
      });
      break;
    case CONNECT_PORTS:
      console.log("CONNECT_PORTS reducer");
      newState = connectPorts(
        state,
        action.fromNodeIndex,
        action.fromPortIndex,
        action.toNodeIndex,
        action.toPortIndex
      );
      newState = clearDragState(newState);
      break;
    case SET_NODE_TEMPLATE_LIST:
      console.log("SET_NODE_TEMPLATE_LIST");
      newState = update(state, {
        nodeTemplates: { $set: action.data.nodeTemplates }
      });
      break;
    case SET_CURRENT_SESSIONID:
      console.log("SET_CURRENT_SESSIONID", action);
      newState = update(state, {
        currentSessionID: { $set: action.id }
      });
      break;
    case RECONNECT_SERVER:
      // Connection was reset in action creator
      newState = update(state, {
        serverGraph: { nodes: { $set: [] }, edges: { $set: [] } }
      });
      break;
    case SET_GRAPH_FROM_SERVER:
      newState = newState = update(state, {
        serverGraph: { $set: action.graph }
      });
      break;
    default:
      console.log("default ", state);
      newState = state;
      break;
  }

  //  console.log("newState  ", newState);
  return newState;
}
