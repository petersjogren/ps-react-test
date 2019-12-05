import React from "react";
import Draggable from "react-draggable";
import { InlineMath } from "react-katex";

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
          {this.props.connections.map((key, index) => (
            <line
              x1={this.props.nodes[key.from.nodeIndex].position.x}
              y1={this.props.nodes[key.from.nodeIndex].position.y}
              x2={this.props.nodes[key.to.nodeIndex].position.x}
              y2={this.props.nodes[key.to.nodeIndex].position.y}
              style={{ stroke: "rgb(0,0,0)", "stroke-width": 2 }}
            />
          ))}
        </svg>
        {this.props.nodes.map((key, index) => (
          <Draggable
            scale={this.props.scale}
            position={this.props.nodes[index].position}
            {...dragHandlers}
            onDrag={(e, position) => this.props.onSetPostition(index, position)}
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
                    "stroke-width": 3,
                    fill: "#66ff66"
                  }}
                  opacity=".7"
                />
              </svg>

              <div className="drag">{key.title}</div>
              <h3>
                <InlineMath>\int_0^\infty x^2 dx</InlineMath>
              </h3>

              <svg className="graphics outport" width="30" height="30">
                <circle
                  className="circle"
                  xmlns="http://www.w3.org/2000/svg"
                  cx="15"
                  cy="15"
                  r="15"
                  style={{
                    stroke: "#000000",
                    "stroke-width": 3,
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

export default GraphicsAreaPureHTML;
