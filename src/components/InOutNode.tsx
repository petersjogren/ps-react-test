import React from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";
import "./InOutNode.css";

var rowHeight = 16;
var portWidth = 15;

interface InPortProps {
  name: string;
  nodeIndex: number;
  portIndex: number;
  onInportDrop: (nodeIndex: number, portIndex: number) => void;
}

function InPort(props: InPortProps) {
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

interface OutPortProps {
  name: string;
  nodeIndex: number;
  portIndex: number;
  onOutportDragStarted: () => void;
}

function OutPort(props: OutPortProps) {
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

export function inPortRelativePosition(node: any, inPortIndex: number) {
  return {
    x: portWidth / 2,
    y: rowHeight + rowHeight * inPortIndex + rowHeight / 2
  };
}

export function outPortRelativePosition(node: any, outPortIndex: number) {
  return {
    x: node.width - portWidth / 2,
    y:
      rowHeight +
      node.inputPorts.length * rowHeight +
      outPortIndex * rowHeight +
      rowHeight / 2
  };
}

export interface InOutNodeProps {
  title: string;
  nodeIndex: number;
  scale: number;
  positionX: number;
  positionY: number;
  width: number;
  isSelected: boolean;
  currentSessionID: string;
  nodeConfirmedInSessionWithID: string;
  inputPorts: any[];
  outputPorts: any[];
  onDrag: DraggableEventHandler;
  onSelectNode: (nodeIndex: number) => void;
  onOutportDragStarted: (nodeIndex: number, portIndex: number) => void;
  onInportDrop: (nodeIndex: number, portIndex: number) => void;
  onDragStop: () => void;
}

export class InOutNode extends React.Component<InOutNodeProps, {}> {
  shouldComponentUpdate(nextProps: InOutNodeProps) {
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
