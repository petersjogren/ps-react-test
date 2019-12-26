export const CHANGE_ZOOM = "CHANGE_ZOOM";
export const POSITION_NODE = "POSITION_NODE";
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

export const zoomAction = percent => ({
  type: CHANGE_ZOOM,
  percent
});

export const deleteSelectedAction = () => ({
  type: DELETE_SELECTED
});

export const selectNodeAction = nodeIndex => ({
  type: SELECT_NODE,
  nodeIndex
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
  toPortIndex
) => ({
  type: CONNECT_PORTS,
  fromNodeIndex,
  fromPortIndex,
  toNodeIndex,
  toPortIndex
});
