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

          <Draggable scale={this.props.scale}>
            <foreignObject x="0" y="320" width="500" height="200">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <img
                  style={{
                    width: "50%",
                    height: "50%",
                    "border-style": "solid",
                    "user-drag": "none",
                    "user-select": "none",
                    "-moz-user-select": "none",
                    "-webkit-user-drag": "none",
                    "-webkit-user-select": "none",
                    "-ms-user-select": "none"
                  }}
                  src="http://minerva-central.net/images/minerva-forward-m1.png"
                />
              </div>
            </foreignObject>
          </Draggable>
          <Draggable scale={this.props.scale}>
            <foreignObject x="400" y="350" width="200" height="400">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{ "background-color": "#eeb", "border-style": "solid" }}
              >
                Over hill, over dale, Thorough bush, thorough brier, Over park,
                over pale, Thorough flood, thorough fire! I do wander
                everywhere, Swifter than the moon's sphere; And I serve the
                Fairy Queen, To dew her orbs upon the green; The cowslips tall
                her pensioners be; In their gold coats spots you see; Those be
                rubies, fairy favours; In those freckles live their savours; I
                must go seek some dewdrops here, And hang a pearl in every
                cowslip's ear.
              </div>
            </foreignObject>
          </Draggable>
          <Draggable scale={this.props.scale}>
            <foreignObject x="750" y="100" width="400" height="500">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                  "background-color": "#eee",
                  "border-style": "solid",
                  height: "90%"
                }}
              >
                <iframe
                  src="http://minerva-central.net/consultancy.html"
                  style={{ height: "90%", width: "90%" }}
                ></iframe>
              </div>
            </foreignObject>
          </Draggable>
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
