import React from "react";
import Draggable from "react-draggable";
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
          if (e.dataTransfer !== null) {
            var textData = e.dataTransfer.getData("text");
            if (textData !== null && textData !== "") {
              var payLoad = JSON.parse(textData);
              if (payLoad !== null && payLoad !== "") {
                console.log("payLoad", payLoad);
                if (payLoad.type === "CONNECT") {
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
              }
            }
          }
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

          var payLoadString = JSON.stringify({
            type: "CONNECT",
            nodeIndex: nodeIndex,
            outPortIndex: portIndex
          });
          console.log("drag start", payLoadString);
          e.dataTransfer.setData("text/plain", payLoadString);
          e.dataTransfer.setDragImage(invisibleDragImage, 0, 0);
          e.dataTransfer.dropEffect = "none";
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

export class InOutNode extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { nodeIndex, scale, position, width, isSelected } = this.props;
    return (
      nextProps.nodeIndex !== nodeIndex ||
      nextProps.scale !== scale ||
      nextProps.position.x !== position.x ||
      nextProps.position.y !== position.y ||
      nextProps.width !== width ||
      nextProps.isSelected !== isSelected
    );
  }

  render() {
    const {
      title,
      nodeIndex,
      scale,
      position,
      onConnect,
      onDrag,
      width,
      isSelected,
      onSelectNode
    } = this.props;
    var classes =
      "node noselect" + (isSelected === true ? " nodeselected" : "");
    return (
      <Draggable
        scale={scale}
        position={position}
        onDrag={onDrag}
        handle="header"
        onMouseDown={e => {
          e.stopPropagation();
          console.log("node clicked");
          onSelectNode(nodeIndex);
        }}
      >
        <div
          className={classes}
          style={{ height: "60px", width: `${width}px` }}
        >
          <div className="main_area">
            <div className="addin noselect">+</div>
            <header className="nodetext noselect">{title}</header>
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
      </Draggable>
    );
  }
}
