import React from "react";
import Draggable from "react-draggable";
import "./InOutNode.css";

export default function(props) {
  return (
    <Draggable
      key={props.key}
      scale={props.scale}
      position={props.position}
      onDrag={props.onDrag}
      handle="header"
    >
      <div className="node noselect" style={{ height: "60px" }}>
        <div className="main_area">
          <div className="addin noselect">+</div>
          <header className="nodetext noselect">Add</header>
          <div className="addout noselect">+</div>
        </div>
        <div className="port_area">
          <div className="port noselect">→</div>
          <div className="porttext in noselect">x</div>
          <div className="noport noselect"></div>
        </div>
        <div className="port_area in">
          <div className="port noselect" draggable={true}>
            →
          </div>
          <div className="porttext in noselect">y</div>
          <div className="noport noselect"></div>
        </div>
        <div className="port_area out">
          <div className="noport noselect"></div>
          <div className="porttext out noselect">sum</div>
          <div
            className="port noselect"
            draggable={true}
            onDrag={e =>
              console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
            }
          >
            →
          </div>
        </div>
      </div>
    </Draggable>
  );
}
