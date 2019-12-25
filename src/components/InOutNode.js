import React from "react";
import DraggableForeignObject from "./DraggableForeignObject";
import "./InOutNode.css";

var rowHeight = 16;
var portWidth = 15;

function InPort(props) {
  const { name, nodeIndex, portIndex, onConnect } = props;
  return (
    <div className="port_area in">
      <div
        className="port noselect"
        draggable={true}
        onDrop={e => {
          var payLoad = JSON.parse(e.dataTransfer.getData("text"));
          console.log("payLoad", payLoad);
          if (payLoad.outPortIndex !== null) {
            console.log(
              `connect node ${payLoad.nodeIndex}:${payLoad.outPortIndex} and node ${nodeIndex}:${portIndex}`
            );
            onConnect(
              payLoad.nodeIndex,
              payLoad.outPortIndex,
              nodeIndex,
              portIndex
            );
          } else {
            console.log("invalid drop");
          }
          e.preventDefault();
        }}
        onDragOver={e => {
          e.preventDefault();
        }}
      >
        →
      </div>
      <header className="porttext in noselect">{name}</header>
      <div className="noport noselect"></div>
    </div>
  );
}

const invisibleDragImage = (() => {
  var img = new Image();
  img.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  return img;
})();

function OutPort(props) {
  const { name, nodeIndex, portIndex } = props;
  return (
    <div className="port_area out">
      <div className="noport noselect"></div>
      <header className="porttext out noselect">{name}</header>
      <div
        className="port noselect"
        draggable={true}
        onDragStart={e => {
          //console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
          {
            var payLoadString = JSON.stringify({
              nodeIndex: nodeIndex,
              outPortIndex: portIndex
            });
            console.log("drag start", payLoadString);
            e.dataTransfer.setData("text/plain", payLoadString);
            e.dataTransfer.setDragImage(invisibleDragImage, 0, 0);
            e.dataTransfer.dropEffect = "none";
          }
        }}
        onDrag={e => {
          console.log("onDrag");
        }}
      >
        →
      </div>
    </div>
  );
}

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

const borderWidth = 3;

export class InOutNode extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { nodeIndex, scale, position } = this.props;
    return (
      nextProps.scale !== scale ||
      nextProps.nodeIndex !== nodeIndex ||
      nextProps.position.x !== position.x ||
      nextProps.position.y !== position.y
    );
  }

  render() {
    const { nodeIndex, scale, position, onConnect, onDrag, width } = this.props;
    var height = 60;
    return (
      <DraggableForeignObject
        scale={scale}
        x={position.x}
        y={position.y}
        width={width + 2 * borderWidth}
        height={height + 2 * borderWidth}
        onDrag={onDrag}
        handle="header"
      >
        <div
          className="node noselect"
          style={{
            width: `${width}px`,
            borderWidth: `${borderWidth}px`
          }}
        >
          <div className="main_area">
            <div className="addin noselect">+</div>
            <header className="nodetext noselect">Add</header>
            <div className="addout noselect">+</div>
          </div>
          <InPort
            name="x"
            nodeIndex={nodeIndex}
            portIndex={0}
            onConnect={onConnect}
          />
          <InPort
            name="y"
            nodeIndex={nodeIndex}
            portIndex={1}
            onConnect={onConnect}
          />
          <OutPort name="sum" nodeIndex={nodeIndex} portIndex={0} />
        </div>
      </DraggableForeignObject>
    );
  }
}
