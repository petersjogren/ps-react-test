export const CHANGE_ZOOM = "CHANGE_ZOOM";
export const POSITION_NODE = "POSITION_NODE";
export const POSITION_EVERY_OTHER_NODE = "POSITION_EVERY_OTHER_NODE";
export const POSITION_TEXT_NODE = "POSITION_TEXT_NODE";
export const POSITION_IMG_NODE = "POSITION_IMG_NODE";
export const TOGGLE_GRAPHICS = "TOGGLE_GRAPHICS";
export const RESET_NORMAL = "RESET_NORMAL";
export const RESET_STRESS_TEST = "RESET_STRESS_TEST";

export const zoomAction = percent => ({
  type: CHANGE_ZOOM,
  percent
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
