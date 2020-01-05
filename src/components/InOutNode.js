import React from "react";
import Draggable from "react-draggable";
import "./InOutNode.css";
import PropTypes from "prop-types";

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
    const {
      nodeIndex,
      scale,
      positionX,
      positionY,
      width,
      isSelected,
      currentSessionID,
      nodeConfirmedInSessionWithID
    } = this.props;
    return (
      nextProps.nodeIndex !== nodeIndex ||
      nextProps.currentSessionID !== currentSessionID ||
      nextProps.scale !== scale ||
      nextProps.nodeConfirmedInSessionWithID !== nodeConfirmedInSessionWithID ||
      nextProps.positionX !== positionX ||
      nextProps.positionY !== positionY ||
      nextProps.width !== width ||
      nextProps.isSelected !== isSelected
    );
  }

  render() {
    const {
      title,
      nodeIndex,
      currentSessionID,
      nodeConfirmedInSessionWithID,
      scale,
      positionX,
      positionY,
      onConnect,
      onDrag,
      width,
      inputPorts,
      outputPorts,
      isSelected,
      onSelectNode
    } = this.props;
    var classes = ["node"];
    if (isSelected) {
      classes.push("nodeselected");
    }
    var isConfirmedInThisSession =
      currentSessionID === nodeConfirmedInSessionWithID;
    if (!isConfirmedInThisSession) {
      classes.push("notconfirmed");
    }
    return (
      <Draggable
        scale={scale}
        position={{ x: positionX, y: positionY }}
        onDrag={onDrag}
        handle="header"
        onMouseDown={e => {
          e.stopPropagation();
          console.log("node clicked");
          onSelectNode(nodeIndex);
        }}
      >
        <div
          className={classes.join(" ")}
          style={{
            height: `${(inputPorts.length + outputPorts.length + 1) *
              (rowHeight - 1)}px`,
            width: `${width}px`
          }}
        >
          <div className="main_area">
            <div className="addin noselect">+</div>
            <header className="nodetext noselect">{title}</header>
            <div className="addout noselect">+</div>
          </div>
          {inputPorts.map((port, portIndex) => {
            return (
              <InPort
                key={portIndex}
                name={port.name}
                nodeIndex={nodeIndex}
                portIndex={portIndex}
                onConnect={onConnect}
              />
            );
          })}

          {outputPorts.map((port, portIndex) => {
            return (
              <OutPort
                key={portIndex}
                name={port.name}
                nodeIndex={nodeIndex}
                portIndex={portIndex}
              />
            );
          })}
        </div>
      </Draggable>
    );
  }
}

InOutNode.propTypes = {
  title: PropTypes.string.isRequired,
  nodeIndex: PropTypes.number.isRequired,
  currentSessionID: PropTypes.string.isRequired,
  nodeConfirmedInSessionWithID: PropTypes.string.isRequired,
  scale: PropTypes.number.isRequired,
  positionX: PropTypes.number.isRequired,
  positionY: PropTypes.number.isRequired,
  inputPorts: PropTypes.any.isRequired,
  outputPorts: PropTypes.any.isRequired,
  width: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onDrag: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  onSelectNode: PropTypes.func.isRequired
};
