export const CHANGE_ZOOM = "CHANGE_ZOOM";
export const POSITION_NODE = "POSITION_NODE";
export const POSITION_TEXT_NODE = "POSITION_TEXT_NODE";
export const POSITION_IMG_NODE = "POSITION_IMG_NODE";
export const TOGGLE_GRAPHICS = "TOGGLE_GRAPHICS";

export const zoomAction = percent => ({
  type: CHANGE_ZOOM,
  percent
});

export const positionNodeAction = (index, position) => ({
  type: POSITION_NODE,
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
