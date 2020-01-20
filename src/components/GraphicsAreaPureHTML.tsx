import React from "react";
import { connect } from "react-redux";
import BezierCurve from "./BezierCurve";
import {
  positionNodeAction,
  positionEveryOtherNodeAction,
  selectNodeAction,
  selectConnectionAction,
  selectClearAction,
  createNodeAction,
  outportDragStartedAction,
  dragCancelledAction,
  inportDropAction,
  dragMousePositionAction,
  dragStopAction
} from "../redux/actions";
import {
  InOutNode,
  inPortRelativePosition,
  outPortRelativePosition
} from "./InOutNode";
import { payLoadTypeOutport } from "../redux/reducers";
import { invalidMousePosition } from "../InitialState";
import { InOutNodeProps } from "./InOutNode";
import { DraggableEvent, DraggableData } from "react-draggable";

class GraphicsAreaPureHTML extends React.Component<any, {}> {
  private myRef = React.createRef<HTMLDivElement>();
  render() {
    return (
      <div
        id="nodearea"
        ref={this.myRef}
        className="nodearea bgpattern"
        onMouseDown={e => {
          console.log("graphicsarea clicked");
          this.props.onSelectClear();
        }}
        onMouseUp={this.props.onDragCancelled}
        onMouseMove={e => {
          // See React Refs and TypeScript: https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315
          const area = this.myRef.current;
          if (area) {
            var rect = area.getBoundingClientRect();
            var x = (e.clientX - rect.left) / this.props.scale; //x position within the element.
            var y = (e.clientY - rect.top) / this.props.scale; //y position within the element.

            if (this.props.isDragInProgress) {
              // console.log("mouse move", x, y);
              this.props.onDragMousePosition(x, y);
            }
          }
        }}
        onDragOver={e => {
          e.preventDefault();
        }}
        // See Event in TypeScript: https://stackoverflow.com/questions/28900077/why-is-event-target-not-element-in-typescript
        onDrop={(e: React.DragEvent<HTMLDivElement>) => {
          if (e.dataTransfer != null) {
            var textData = e.dataTransfer.getData("text");
            console.log("textData", textData);
            if (textData != null && textData !== "") {
              var payLoad = JSON.parse(textData);
              console.log("dropped on nodearea", e, e.clientX, e.clientY);
              if (payLoad.type === "CREATE_NODE") {
                const targetElement = e.target as HTMLDivElement;
                if (targetElement) {
                  var rect = targetElement.getBoundingClientRect();
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
                    isConfirmed={false}
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
            this.props.connections.map((key: any, index: number) => {
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
                  isConfirmed={
                    this.props.currentSessionID === key.confirmedInSessionWithID
                  }
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

          {this.props.nodes.map((key: any, index: number) => {
            const nodeProps: InOutNodeProps = {
              title: key.title,
              nodeIndex: index,
              currentSessionID: this.props.currentSessionID,
              nodeConfirmedInSessionWithID: key.nodeConfirmedInSessionWithID,
              scale: this.props.scale,
              positionX: key.position.x,
              positionY: key.position.y,
              inputPorts: key.inputPorts,
              outputPorts: key.outputPorts,
              width: key.width,
              isSelected: key.isSelected,
              onDrag: (e: DraggableEvent, data: DraggableData) => {
                this.props.onSetPosition(
                  index,
                  { x: data.x, y: data.y },
                  this.props.stressTest
                );
              },
              onDragStop: this.props.onDragStop,
              onSelectNode: this.props.onSelectNode,
              onOutportDragStarted: this.props.onOutportDragStarted,
              onInportDrop: (nodeIndex: number, portIndex: number) => {
                if (this.props.isDragInProgress) {
                  this.props.onInportDrop(
                    nodeIndex,
                    portIndex,
                    this.props.isDragInProgress,
                    this.props.dragPayload,
                    this.props.nodes[this.props.dragPayload.nodeIndex].id,
                    this.props.nodes[nodeIndex].id
                  );
                }
              }
            };
            return <InOutNode key={index} {...nodeProps} />;
          })}
        </div>
      </div>
    );
  }
}

// TypeScript types. See https://spin.atomicobject.com/2017/04/20/typesafe-container-components/
// No type check for now.
const mapStateToProps = (state: any) => ({
  nodes: state.present.nodes,
  connections: state.present.connections,
  scale: state.present.scale,
  currentSessionID: state.present.currentSessionID,
  stressTest: state.present.stressTest,
  isDragInProgress: state.present.isDragInProgress,
  dragPayload: state.present.dragPayload,
  dragMousePosition: state.present.dragMousePosition
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetPosition: (index: number, position: any, stressTest: boolean) => {
    if (stressTest) {
      dispatch(positionEveryOtherNodeAction(index, position));
    } else {
      dispatch(positionNodeAction(index, position));
    }
  },
  onSelectNode: (nodeIndex: number) => dispatch(selectNodeAction(nodeIndex)),
  onSelectConnection: (connectionIndex: number) =>
    dispatch(selectConnectionAction(connectionIndex)),
  onSelectClear: () => dispatch(selectClearAction()),
  onCreateNode: (x: number, y: number, index: number, title: string) =>
    dispatch(createNodeAction(x, y, index, title)),
  onOutportDragStarted: (nodeIndex: number, portIndex: number) => {
    dispatch(outportDragStartedAction(nodeIndex, portIndex));
  },
  onInportDrop: (
    nodeIndex: number,
    portIndex: number,
    isDragInProgress: boolean,
    dragPayload: any,
    fromNodeId: string,
    toNodeId: string
  ) =>
    dispatch(
      inportDropAction(
        nodeIndex,
        portIndex,
        isDragInProgress,
        dragPayload,
        fromNodeId,
        toNodeId
      )
    ),
  onDragStop: () => dispatch(dragStopAction()),
  onDragCancelled: () => dispatch(dragCancelledAction()),
  onDragMousePosition: (x: number, y: number) =>
    dispatch(dragMousePositionAction(x, y))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphicsAreaPureHTML);
