import React from "react";
import { connect } from "react-redux";
// import { InlineMath } from "react-katex";
import BezierCurve from "./BezierCurve";
import DraggableForeignObject from "./DraggableForeignObject";
import {
  positionNodeAction,
  positionEveryOtherNodeAction,
  positionTextNodeAction,
  positionImgNodeAction,
  connectPortsAction
} from "../redux/actions";
import HTMLNode from "./HTMLNode";
import {
  InOutNode,
  inPortRelativePosition,
  outPortRelativePosition
} from "./InOutNode";

class GraphicsAreaPureHTML extends React.Component {
  render() {
    return (
      <div
        className="graphicsarea"
        style={{ transform: "scale(" + this.props.scale + ")" }}
      >
        <svg
          className="arrowsvg"
          style={{ position: "relative", top: "0px", left: "0px" }}
        >
          {this.props.connections.map((key, index) => {
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
                curveWidth={2}
              />
            );
          })}

          <DraggableForeignObject
            scale={this.props.scale}
            x={this.props.imgNode.x}
            y={this.props.imgNode.y}
            width={this.props.imgNode.width}
            height={this.props.imgNode.height}
            onDrag={(e, position) => this.props.onSetImgNodePosition(position)}
          >
            <img
              style={{
                width: "50%",
                height: "50%",
                borderStyle: "solid",
                userDrag: "none",
                userSelect: "none",
                MozUserSelect: "none",
                WebkitUserDrag: "none",
                WebkitUserSelect: "none",
                msUserSelect: "none"
              }}
              src={this.props.imgNode.url}
              alt="Something nice"
            />
          </DraggableForeignObject>

          <DraggableForeignObject
            scale={this.props.scale}
            x={this.props.textNode.x}
            y={this.props.textNode.y}
            width={this.props.textNode.width}
            height={this.props.textNode.height}
            onDrag={(e, position) => this.props.onSetTextNodePosition(position)}
          >
            <div style={{ backgroundColor: "#eeb", borderStyle: "solid" }}>
              {this.props.textNode.text}
            </div>
          </DraggableForeignObject>

          {this.props.nodes.map((key, index) =>
            key.htmlNode ? (
              <HTMLNode
                title={key.title}
                key={index}
                scale={this.props.scale}
                position={this.props.nodes[index].position}
                onDrag={(e, position) => {
                  this.props.onSetPosition(index, position, false);
                }}
              />
            ) : (
              <InOutNode
                title={key.title}
                key={index}
                nodeIndex={index}
                scale={this.props.scale}
                position={this.props.nodes[index].position}
                width={this.props.nodes[index].width}
                onDrag={(e, position) => {
                  this.props.onSetPosition(
                    index,
                    position,
                    this.props.stressTest
                  );
                }}
                onConnect={this.props.onConnect}
              />
            )
          )}
        </svg>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nodes: state.nodes,
  connections: state.connections,
  scale: state.scale,
  textNode: state.textNode,
  imgNode: state.imgNode,
  stressTest: state.stressTest
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphicsAreaPureHTML);
