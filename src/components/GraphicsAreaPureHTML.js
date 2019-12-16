import React from "react";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import { InlineMath } from "react-katex";
import BezierCurve from "./BezierCurve";
import DraggableForeignObject from "./DraggableForeignObject";
import {
  positionNodeAction,
  positionTextNodeAction,
  positionImgNodeAction
} from "../redux/actions";

class GraphicsAreaPureHTML extends React.Component {
  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
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
            return (
              <BezierCurve
                key={index}
                start={{ ...fromNode.position }}
                end={{ ...toNode.position }}
                c1={{
                  x: (fromNode.position.x + toNode.position.x) / 2,
                  y: fromNode.position.y
                }}
                c2={{
                  x: (fromNode.position.x + toNode.position.x) / 2,
                  y: toNode.position.y
                }}
                curveColor="blue"
                curveWidth={7}
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
        </svg>

        {this.props.nodes.map((key, index) => (
          <Draggable
            key={index}
            scale={this.props.scale}
            position={this.props.nodes[index].position}
            {...dragHandlers}
            onDrag={(e, position) => this.props.onSetPosition(index, position)}
          >
            <div className="box no-cursor">
              <svg className="graphics inport">
                <circle
                  className="circle"
                  xmlns="http://www.w3.org/2000/svg"
                  cx="15"
                  cy="15"
                  r="15"
                  style={{
                    stroke: "#000000",
                    strokeWidth: 3,
                    fill: "#66ff66"
                  }}
                  opacity=".7"
                />
              </svg>

              <div className="drag">{key.title}</div>
              <h3>{/* <InlineMath>\int_0^\infty x^2 dx</InlineMath> */}</h3>

              <svg className="graphics outport" width="30" height="30">
                <circle
                  className="circle"
                  xmlns="http://www.w3.org/2000/svg"
                  cx="15"
                  cy="15"
                  r="15"
                  style={{
                    stroke: "#000000",
                    strokeWidth: 3,
                    fill: "#ff0000"
                  }}
                  opacity=".7"
                />
              </svg>
            </div>
          </Draggable>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nodes: state.nodes,
  connections: state.connections,
  scale: state.scale,
  textNode: state.textNode,
  imgNode: state.imgNode
});

const mapDispatchToProps = dispatch => ({
  onSetPosition: (index, position) =>
    dispatch(positionNodeAction(index, position)),
  onSetTextNodePosition: position => dispatch(positionTextNodeAction(position)),
  onSetImgNodePosition: position => dispatch(positionImgNodeAction(position))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphicsAreaPureHTML);
