import React from "react";
import "./InOutNode.css";

export default function(props) {
  return (
    <div className="node noselect" style={{ height: "60px" }}>
      <div className="main_area">
        <div className="addin noselect">+</div>
        <div className="nodetext noselect">Add</div>
        <div className="addout noselect">+</div>
      </div>
      <div className="port_area">
        <div className="port noselect">→</div>
        <div className="porttext in noselect">x</div>
        <div className="noport noselect"></div>
      </div>
      <div className="port_area in">
        <div className="port noselect">→</div>
        <div className="porttext in noselect">y</div>
        <div className="noport noselect"></div>
      </div>
      <div className="port_area out">
        <div className="noport noselect"></div>
        <div className="porttext out noselect">sum</div>
        <div className="port noselect">→</div>
      </div>
    </div>
  );
}
