import React from "react";
import Draggable from "react-draggable";

function DraggableForeignObject(props) {
  return (
    <Draggable scale={props.scale}>
      <foreignObject
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
      >
        <div xmlns="http://www.w3.org/1999/xhtml">{props.children}</div>
      </foreignObject>
    </Draggable>
  );
}

export default DraggableForeignObject;
