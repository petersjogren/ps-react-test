import React from "react";
import "./App.css";
import Draggable from "react-draggable";
import DownloadLink from "react-download-link";

import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

import Tooltip from "rc-tooltip";
import Slider from "rc-slider";

import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const wrapperStyle = { width: 400, margin: 50 };

const ShowPosition = props => (
  <h4>
    {props.label} = ({props.position.x}, {props.position.y})
  </h4>
);

class InputNumber extends React.Component {
  render(props) {
    return (
      <div>
        <input
          type="number"
          value={this.props.value}
          onChange={this.props.handleChange}
        />
        <input
          type="button"
          value={"Click me " + this.props.setToValue}
          onClick={this.props.handleClick}
        />
      </div>
    );
  }
}

const kNoMetod = { nodeId: -1, direction: "input", type: "N/A" };

class App extends React.Component {
  state = {
    radius: 20,
    cx: 100,
    scale: 0.9,
    over: kNoMetod,
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0
    },
    nodes: [
      {
        title: "2D shape transformation",
        id: 213,
        position: {
          x: 260,
          y: 0
        },
        inputPorts: [
          { name: "in x", type: "int" },
          { name: "in y", type: "int" }
        ],
        outputPorts: [
          { name: "out x", type: "float" },
          { name: "out y", type: "float" }
        ]
      },
      {
        title: "Measurement",
        id: 19,
        position: {
          x: 350,
          y: 100
        },
        inputPorts: [
          { name: "amount", type: "int" },
          { name: "temperature", type: "float" },
          { name: "the grid", type: "se.minerva.Grid" }
        ],
        outputPorts: [
          { name: "result x", type: "float" },
          { name: "result y", type: "float" },
          { name: "result z", type: "float" }
        ]
      },
      {
        title: "Colorizer",
        id: 23,
        position: {
          x: 510,
          y: 236
        },
        inputPorts: [
          { name: "amount", type: "int" },
          { name: "temperature", type: "float" }
        ],
        outputPorts: [
          { name: "red", type: "int" },
          { name: "blue", type: "int" },
          { name: "green", type: "int" },
          { name: "alpha", type: "float" },
          { name: "grid", type: "se.minerva.Grid" }
        ]
      },
      {
        title: "1D transformation",
        id: 101,
        position: {
          x: 95,
          y: 236
        },
        inputPorts: [{ name: "x", type: "float" }],
        outputPorts: [{ name: "x", type: "float" }]
      }
    ],
    connections: [
      {
        from: {
          nodeIndex: 0,
          index: 0
        },
        to: {
          nodeIndex: 1,
          index: 1
        }
      },
      {
        from: {
          nodeIndex: 2,
          index: 4
        },
        to: {
          nodeIndex: 1,
          index: 2
        }
      },
      {
        from: {
          nodeIndex: 3,
          index: 0
        },
        to: {
          nodeIndex: 1,
          index: 1
        }
      }
    ],
    knobValue: 50
  };

  onStart = () => {
    this.setState({ activeDrags: this.state.activeDrags + 1 });
  };

  onStop = () => {
    this.setState({ activeDrags: this.state.activeDrags - 1 });
  };

  // For controlled component

  onControlledDragUtil = (e, position, index) => {
    var newState = { ...this.state };
    newState.nodes[index].position.x = position.x;
    newState.nodes[index].position.y = position.y;
    this.setState(newState);
  };

  onControlledDrag(index) {
    return (e, position) => {
      this.onControlledDragUtil(e, position, index);
    };
  }

  onControlledDragStop(index) {
    return (e, position) => {
      this.onControlledDragUtil(e, position, index);
      this.onStop();
    };
  }

  constructor(props) {
    super(props);
    this.state.radius = 20;
  }

  render(props) {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    return (
      <div className="App">
        <div className="topbar">
          <div className="zoom" style={wrapperStyle}>
            <Slider
              min={20}
              max={150}
              defaultValue={this.state.scale * 100}
              handle={handle}
              onChange={value => this.setState({ scale: value / 100 })}
            />
          </div>
          <DownloadLink
            label="Save state to disk"
            className="savestate"
            tagName="h2"
            filename="state.txt"
            exportFile={() => JSON.stringify(this.state, null, 2)}
          >
            <h1>Save state to disk</h1>
          </DownloadLink>
        </div>
        <div
          className="graphicsarea"
          style={{ transform: "scale(" + this.state.scale + ")" }}
        >
          <svg
            className="arrowsvg"
            style={{ position: "relative", top: "0px", left: "0px" }}
          >
            {this.state.connections.map((key, index) => (
              <line
                x1={this.state.nodes[key.from.nodeIndex].position.x}
                y1={this.state.nodes[key.from.nodeIndex].position.y}
                x2={this.state.nodes[key.to.nodeIndex].position.x}
                y2={this.state.nodes[key.to.nodeIndex].position.y}
                style={{ stroke: "rgb(0,0,0)", "stroke-width": 2 }}
              />
            ))}
          </svg>
          {this.state.nodes.map((key, index) => (
            <Draggable
              scale={this.state.scale}
              position={this.state.nodes[index].position}
              {...dragHandlers}
              onDrag={this.onControlledDrag(index)}
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
      </div>
    );
  }
}

export default App;
