import React from "react";
import Draggable from "react-draggable";
import "./InOutNode.css";
import PropTypes from "prop-types";

var rowHeight = 16;
var portWidth = 15;

function InPort(props) {
  const { name, nodeIndex, portIndex } = props;
  return (
    <div className="port_area in">
      <div
        className="port noselect"
        // ??? Add onTouchUp onTouchMove onTouchDown that do the same things to support phones.
        onMouseUp={e => {
          e.stopPropagation();
          console.log("mouse up in in port");
          props.onInportDrop(nodeIndex, portIndex);
        }}
      >
        →
      </div>
      <header className="porttext in noselect">{name}</header>
      <div className="noport noselect"></div>
    </div>
  );
}

function OutPort(props) {
  const { name } = props;
  return (
    <div className="port_area out">
      <div className="noport noselect"></div>
      <header className="porttext out noselect">{name}</header>
      <div
        className="port noselect"
        onMouseDown={e => {
          console.log("outport onmousedown. Begin out port drag");
          props.onOutportDragStarted();
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
      onDrag,
      width,
      inputPorts,
      outputPorts,
      isSelected,
      onSelectNode,
      onOutportDragStarted,
      onInportDrop,
      onDragStop
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
        onStop={onDragStop}
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
                onInportDrop={onInportDrop}
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
                onOutportDragStarted={() => {
                  console.log("onOutportDragStarted");
                  onOutportDragStarted(nodeIndex, portIndex);
                }}
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
  onDragStop: PropTypes.func.isRequired,
  onSelectNode: PropTypes.func.isRequired,
  onOutportDragStarted: PropTypes.func.isRequired,
  onInportDrop: PropTypes.func.isRequired
};
