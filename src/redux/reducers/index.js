import { InitialState } from "../../InitialState";
import update from "immutability-helper";
import {
  CHANGE_ZOOM,
  POSITION_NODE,
  POSITION_EVERY_OTHER_NODE,
  POSITION_TEXT_NODE,
  POSITION_IMG_NODE,
  TOGGLE_GRAPHICS
} from "../actions";

export default function graphEditorReducer(state = InitialState(), action) {
  //  console.log("graphEditorReducer", action);
  var newState;
  //  console.log("state before ", state);
  var deltaX;
  var deltaY;
  switch (action.type) {
    case CHANGE_ZOOM:
      newState = update(state, { scale: { $set: action.percent / 100 } });
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
      var updateObject = {};
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
    default:
      console.log("default ", state);
      newState = state;
      break;
  }

  //  console.log("newState  ", newState);
  return newState;
}
