import React from "react";
import { connect } from "react-redux";
// import { InlineMath } from "react-katex";
import BezierCurve from "./BezierCurve";
import {
  positionNodeAction,
  positionEveryOtherNodeAction,
  positionTextNodeAction,
  positionImgNodeAction,
  connectPortsAction,
  selectNodeAction,
  selectConnectionAction,
  selectClearAction,
  createNodeAction,
  outportDragStartedAction,
  dragCancelledAction,
  inportDropAction,
  dragMousePositionAction
} from "../redux/actions";
import HTMLNode from "./HTMLNode";
import {
  InOutNode,
  inPortRelativePosition,
  outPortRelativePosition
} from "./InOutNode";
import { payLoadTypeOutport } from "../redux/reducers";
import { invalidMousePosition } from "../InitialState";

class GraphicsAreaPureHTML extends React.Component {
  render() {
    return (
      <div
        id="nodearea"
        className="nodearea bgpattern"
        onMouseDown={e => {
          console.log("graphicsarea clicked");
          this.props.onSelectClear();
        }}
        onMouseUp={this.props.onDragCancelled}
        onMouseMove={e => {
          var rect = document
            .getElementById("nodearea")
            .getBoundingClientRect();
          var x = (e.clientX - rect.left) / this.props.scale; //x position within the element.
          var y = (e.clientY - rect.top) / this.props.scale; //y position within the element.

          if (this.props.isDragInProgress) {
            // console.log("mouse move", x, y);
            this.props.onDragMousePosition(x, y);
          }
        }}
        onDragOver={e => {
          e.preventDefault();
        }}
        onDrop={e => {
          if (e.dataTransfer != null) {
            var textData = e.dataTransfer.getData("text");
            console.log("textData", textData);
            if (textData != null && textData !== "") {
              var payLoad = JSON.parse(textData);
              console.log("dropped on nodearea", e, e.clientX, e.clientY);
              if (payLoad.type === "CREATE_NODE") {
                var rect = e.target.getBoundingClientRect();
                var x = (e.clientX - rect.left) / this.props.scale; //x position within the element.
                var y = (e.clientY - rect.top) / this.props.scale; //y position within the element.

                this.props.onCreateNode(
                  x,
                  y,
                  payLoad.templateIndex,
                  payLoad.title
                );
              }
            }
          }
        }}
      >
        <div
          className="graphicsarea"
          style={{ transform: "scale(" + this.props.scale + ")" }}
        >
          <svg
            className="arrowsvg"
            style={{ position: "relative", top: "0px", left: "0px" }}
          >
            {// Draw a curve during drag
            (() => {
              if (
                this.props.isDragInProgress &&
                this.props.dragPayload.type === payLoadTypeOutport &&
                this.props.dragMousePosition.x !== invalidMousePosition
              ) {
                var fromNode = this.props.nodes[
                  this.props.dragPayload.nodeIndex
                ];
                var fromX =
                  fromNode.position.x +
                  outPortRelativePosition(
                    fromNode,
                    this.props.dragPayload.portIndex
                  ).x;
                var fromY =
                  fromNode.position.y +
                  outPortRelativePosition(
                    fromNode,
                    this.props.dragPayload.portIndex
                  ).y;
                var toX = this.props.dragMousePosition.x;
                var toY = this.props.dragMousePosition.y;
                return (
                  <BezierCurve
                    key={0}
                    isSelected={false}
                    connectionIndex={0}
                    onSelectConnection={() => {}}
                    start={{ x: fromX, y: fromY }}
                    end={{ x: toX, y: toY }}
                    c1={{
                      x: fromX + (fromNode.width * 3) / 4,
                      y: fromY
                    }}
                    c2={{
                      x: toX - (fromNode.width * 3) / 4,
                      y: toY
                    }}
                    curveColor="black"
                    curveWidth={3}
                  />
                );
              }
            })()}

            {// Draw all connections between nodes
            this.props.connections.map((key, index) => {
              var fromNode = this.props.nodes[key.from.nodeIndex];
              var toNode = this.props.nodes[key.to.nodeIndex];
              var fromX =
                fromNode.position.x +
                outPortRelativePosition(fromNode, key.from.index).x;
              var fromY =
                fromNode.position.y +
                outPortRelativePosition(fromNode, key.from.index).y;
              var toX =
                toNode.position.x +
                inPortRelativePosition(toNode, key.to.index).x;
              var toY =
                toNode.position.y +
                inPortRelativePosition(toNode, key.to.index).y;
              return (
                <BezierCurve
                  key={index}
                  isSelected={key.isSelected}
                  connectionIndex={index}
                  onSelectConnection={this.props.onSelectConnection}
                  start={{ x: fromX, y: fromY }}
                  end={{ x: toX, y: toY }}
                  c1={{
                    x: fromX + (fromNode.width * 3) / 4,
                    y: fromY
                  }}
                  c2={{
                    x: toX - (toNode.width * 3) / 4,
                    y: toY
                  }}
                  curveColor="black"
                  curveWidth={3}
                />
              );
            })}
          </svg>

          {this.props.nodes.map((key, index) =>
            key.htmlNode ? (
              <HTMLNode
                title={key.title}
                key={index}
                scale={this.props.scale}
                position={key.position}
                onDrag={(e, position) => {
                  this.props.onSetPosition(index, position, false);
                }}
              />
            ) : (
              <InOutNode
                title={key.title}
                key={index}
                nodeIndex={index}
                currentSessionID={this.props.currentSessionID}
                nodeConfirmedInSessionWithID={key.nodeConfirmedInSessionWithID}
                scale={this.props.scale}
                positionX={key.position.x}
                positionY={key.position.y}
                inputPorts={key.inputPorts}
                outputPorts={key.outputPorts}
                width={key.width}
                isSelected={key.isSelected}
                onDrag={(e, position) => {
                  this.props.onSetPosition(
                    index,
                    position,
                    this.props.stressTest
                  );
                }}
                onConnect={this.props.onConnect}
                onSelectNode={this.props.onSelectNode}
                onOutportDragStarted={this.props.onOutportDragStarted}
                onInportDrop={this.props.onInportDrop}
              />
            )
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nodes: state.nodes,
  connections: state.connections,
  scale: state.scale,
  currentSessionID: state.currentSessionID,
  textNode: state.textNode,
  imgNode: state.imgNode,
  stressTest: state.stressTest,
  isDragInProgress: state.isDragInProgress,
  dragPayload: state.dragPayload,
  dragMousePosition: state.dragMousePosition
});

const mapDispatchToProps = dispatch => ({
  onSetPosition: (index, position, stressTest) => {
    if (stressTest) {
      dispatch(positionEveryOtherNodeAction(index, position));
    } else {
      dispatch(positionNodeAction(index, position));
    }
  },
  onSetTextNodePosition: position => dispatch(positionTextNodeAction(position)),
  onSetImgNodePosition: position => dispatch(positionImgNodeAction(position)),
  onConnect: (fromNodeIndex, fromPortIndex, toNodeIndex, toPortIndex) => {
    console.log("onConnected");
    dispatch(
      connectPortsAction(fromNodeIndex, fromPortIndex, toNodeIndex, toPortIndex)
    );
  },
  onSelectNode: nodeIndex => dispatch(selectNodeAction(nodeIndex)),
  onSelectConnection: connectionIndex =>
    dispatch(selectConnectionAction(connectionIndex)),
  onSelectClear: () => dispatch(selectClearAction()),
  onCreateNode: (x, y, index, title) =>
    dispatch(createNodeAction(x, y, index, title)),
  onOutportDragStarted: (nodeIndex, portIndex) => {
    dispatch(outportDragStartedAction(nodeIndex, portIndex));
  },
  onInportDrop: (nodeIndex, portIndex) =>
    dispatch(inportDropAction(nodeIndex, portIndex)),
  onDragCancelled: () => dispatch(dragCancelledAction()),
  onDragMousePosition: (x, y) => dispatch(dragMousePositionAction(x, y))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphicsAreaPureHTML);
