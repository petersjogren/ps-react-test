import InitialState from "../../InitialState";
import update from "immutability-helper";
import {
  CHANGE_ZOOM,
  POSITION_NODE,
  POSITION_TEXT_NODE,
  POSITION_IMG_NODE,
  TOGGLE_GRAPHICS
} from "../actions";

export default function graphEditorReducer(state = InitialState(), action) {
  console.log("graphEditorReducer", action);
  var newState;
  console.log("state before ", state);
  switch (action.type) {
    case CHANGE_ZOOM:
      newState = update(state, { scale: { $set: action.percent / 100 } });
      break;
    case POSITION_NODE:
      var { index, position } = action;
      newState = update(state, {
        nodes: { [index]: { position: { $set: position } } }
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

  console.log("newState  ", newState);
  return newState;
}
