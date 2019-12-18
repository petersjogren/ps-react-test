import React from "react";
import { connect } from "react-redux";
// import { InlineMath } from "react-katex";
import BezierCurve from "./BezierCurve";
import DraggableForeignObject from "./DraggableForeignObject";
import {
  positionNodeAction,
  positionEveryOtherNodeAction,
  positionTextNodeAction,
  positionImgNodeAction
} from "../redux/actions";
import HTMLNode from "./HTMLNode";

import InOutNode from "../components/InOutNode";

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
        </svg>

        {this.props.nodes.map((key, index) =>
          key.htmlNode ? (
            <HTMLNode
              title={key.title}
              key={index}
              scale={this.props.scale}
              position={this.props.nodes[index].position}
              onDrag={(e, position) =>
                this.props.onSetPosition(index, position)
              }
            />
          ) : (
            <InOutNode
              title={key.title}
              key={index}
              scale={this.props.scale}
              position={this.props.nodes[index].position}
              onDrag={(e, position) =>
                this.props.onSetPosition(index, position)
              }
            />
          )
        )}
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
    dispatch(positionEveryOtherNodeAction(index, position)),
  onSetTextNodePosition: position => dispatch(positionTextNodeAction(position)),
  onSetImgNodePosition: position => dispatch(positionImgNodeAction(position))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphicsAreaPureHTML);
