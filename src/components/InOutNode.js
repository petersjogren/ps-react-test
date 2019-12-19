import React from "react";
import Draggable from "react-draggable";
import "./InOutNode.css";

var rowHeight = 16;
var portWidth = 15;

export function inPortRelativePosition(node, inPortIndex) {
  return {
    x: portWidth / 2,
    y: rowHeight + rowHeight * inPortIndex + rowHeight / 2
  };
}

export function outPortRelativePosition(node, outPortIndex) {
  return {
    x: node.width - portWidth / 2,
    y:
      rowHeight +
      node.inputPorts.length * rowHeight +
      outPortIndex * rowHeight +
      rowHeight / 2
  };
}

export class InOutNode extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { scale, position } = this.props;
    return (
      nextProps.scale !== scale ||
      nextProps.position.x !== position.x ||
      nextProps.position.y !== position.y
    );
  }

  render() {
    return (
      <Draggable
        scale={this.props.scale}
        position={this.props.position}
        onDrag={this.props.onDrag}
        handle="header"
      >
        <div
          className="node noselect"
          style={{ height: "60px", width: `${this.props.width}px` }}
        >
          <div className="main_area">
            <div className="addin noselect">+</div>
            <header className="nodetext noselect">Add</header>
            <div className="addout noselect">+</div>
          </div>
          <div className="port_area">
            <div className="port noselect">→</div>
            <header className="porttext in noselect">x</header>
            <div className="noport noselect"></div>
          </div>
          <div className="port_area in">
            <div className="port noselect" draggable={true}>
              →
            </div>
            <header className="porttext in noselect">y</header>
            <div className="noport noselect"></div>
          </div>
          <div className="port_area out">
            <div className="noport noselect"></div>
            <header className="porttext out noselect">sum</header>
            <div
              className="port noselect"
              draggable={true}
              onDragStart={e => {
                e.preventDefault();
                console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                //e.dataTransfer.setData("URL", "http://www.sf.se");
                //e.dataTransfer.effectAllowed = "link";
              }}
              onDrag={e => {
                console.log("e.nativeEvent.offsetX, e.nativeEvent.offsetY");
              }}
              onDragEnd={e => {
                console.log("e.nativeEvent.offsetX, e.nativeEvent.offsetY");
              }}
            >
              →
            </div>
          </div>
        </div>
      </Draggable>
    );
  }
}
