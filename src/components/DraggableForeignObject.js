import React from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";

function DraggableForeignObject(props) {
  return (
    <Draggable
      scale={props.scale}
      onDrag={props.onDrag}
      position={props}
      handle={props.handle}
    >
      <foreignObject x={0} y={0} width={props.width} height={props.height}>
        <div xmlns="http://www.w3.org/1999/xhtml">{props.children}</div>
      </foreignObject>
    </Draggable>
  );
}

DraggableForeignObject.propTypes = {
  scale: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onDrag: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  handle: PropTypes.string
};

export default DraggableForeignObject;
