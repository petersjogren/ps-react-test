// This is an incomplete node that has some HTML and some svg on it
// just to show that svg can be positioned with HTML elements.

import React from "react";
import Draggable from "react-draggable";

interface Pos {
  x: number;
  y: number;
}

interface Props {
  key: string;
  title: string;
  scale: number;
  position: Pos;
  onDrag: any;
}

export default function(props: Props) {
  return (
    <Draggable
      key={props.key}
      scale={props.scale}
      position={props.position}
      onDrag={props.onDrag}
    >
      <div className="box no-cursor">
        <svg className="graphics inport">
          <circle
            className="circle"
            xmlns="http://www.w3.org/2000/svg"
            cx="15"
            cy="15"
            r="15"
            style={{
              stroke: "#000000",
              strokeWidth: 3,
              fill: "#66ff66"
            }}
            opacity=".7"
          />
        </svg>

        <div className="drag">{props.title}</div>
        <h3>{/* <InlineMath>\int_0^\infty x^2 dx</InlineMath> */}</h3>

        <svg className="graphics outport" width="30" height="30">
          <circle
            className="circle"
            xmlns="http://www.w3.org/2000/svg"
            cx="15"
            cy="15"
            r="15"
            style={{
              stroke: "#000000",
              strokeWidth: 3,
              fill: "#ff0000"
            }}
            opacity=".7"
          />
        </svg>
      </div>
    </Draggable>
  );
}
