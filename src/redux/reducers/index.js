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
  POSITION_TEXT_NODE,
  POSITION_IMG_NODE,
  TOGGLE_GRAPHICS,
  RESET_NORMAL,
  RESET_STRESS_TEST,
  CONNECT_PORTS,
  CREATE_NODE
} from "../actions";

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
  switch (action.type) {
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
              x: { $set: action.x },
              y: { $set: action.y }
            }
          }
        }
      });
      console.log("state after ", newState);
      break;
    case SELECT_CONNECTION:
      console.log("SELECT_CONNECTION", action.connectionIndex);
      newState = update(state, {
        connections: {
          [action.connectionIndex]: {
            isSelected: { $set: true }
          }
        }
      });
      break;
    case SELECT_CLEAR:
      console.log("SELECT_CLEAR");
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
      deltaX = action.position.x - state.nodes[action.index].position.x;
      deltaY = action.position.y - state.nodes[action.index].position.y;
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
    case POSITION_TEXT_NODE:
      newState = update(state, {
        textNode: {
          x: { $set: action.position.x },
          y: { $set: action.position.y }
        }
      });
      break;
    case POSITION_IMG_NODE:
      newState = update(state, {
        imgNode: {
          x: { $set: action.position.x },
          y: { $set: action.position.y }
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
      newState = InitialState(false);
      break;
    case RESET_STRESS_TEST:
      newState = InitialState(true);
      break;
    case CONNECT_PORTS:
      console.log("CONNECT_PORTS reducer");
      newState = update(state, {
        connections: {
          $push: [
            {
              isSelected: false,
              from: {
                nodeIndex: action.fromNodeIndex,
                index: action.fromPortIndex
              },
              to: {
                nodeIndex: action.toNodeIndex,
                index: action.toPortIndex
              }
            }
          ]
        }
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
