import React from "react";
import "./App.css";

import GraphicsAreaPureHTML from "./components/GraphicsAreaPureHTML";
import GraphicsAreaDraw2D from "./components/CanvasDraw2D";

import "katex/dist/katex.min.css";

import TopBar from "./components/TopBar";

const kNoMetod = { nodeId: -1, direction: "input", type: "N/A" };

class App extends React.Component {
  state = {
    pureHTMLgraph: true,
    scale: 1.0,
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
          y: 20
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
          y: 120
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
    textNode: {
      x: 400,
      y: 350,
      width: 200,
      height: 400,
      text: `Over hill, over dale, Thorough bush, thorough brier, Over park,
        over pale, Thorough flood, thorough fire! I do wander everywhere,
        Swifter than the moon's sphere; And I serve the Fairy Queen, To
        dew her orbs upon the green; The cowslips tall her pensioners be;
        In their gold coats spots you see; Those be rubies, fairy favours;
        In those freckles live their savours; I must go seek some dewdrops
        here, And hang a pearl in every cowslip's ear.`
    },
    imgNode: {
      x: 50,
      y: 350,
      width: 400,
      height: 300,
      url: "http://minerva-central.net/images/minerva-forward-m1.png"
    }
  };

  onStart = () => {
    this.setState({ activeDrags: this.state.activeDrags + 1 });
  };

  onStop = () => {
    this.setState({ activeDrags: this.state.activeDrags - 1 });
  };

  // For controlled component

  setPositionOnNode = (index, position) => {
    var newState = { ...this.state };
    newState.nodes[index].position.x = position.x;
    newState.nodes[index].position.y = position.y;
    this.setState(newState);
  };

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
    return (
      <div className="App">
        <button
          onClick={() =>
            this.setState({
              ...this.state,
              pureHTMLgraph: this.state.pureHTMLgraph ? false : true
            })
          }
        >
          <h2>Toggle graphics library (Pure HTML / Draw2D)</h2>
        </button>
        <TopBar
          className="topbar"
          showControls={this.state.pureHTMLgraph}
          defaultScale={this.state.scale * 100}
          onChange={value => this.setState({ scale: value / 100 })}
        />

        {this.state.pureHTMLgraph ? (
          <GraphicsAreaPureHTML
            nodes={this.state.nodes}
            connections={this.state.connections}
            scale={this.state.scale}
            textNode={this.state.textNode}
            imgNode={this.state.imgNode}
            onSetPosition={(index, position) =>
              this.setPositionOnNode(index, position)
            }
            onSetTextNodePosition={position =>
              this.setState({
                ...this.state,
                textNode: {
                  ...this.state.textNode,
                  x: position.x,
                  y: position.y
                }
              })
            }
            onSetImgNodePosition={position =>
              this.setState({
                ...this.state,
                imgNode: {
                  ...this.state.imgNode,
                  x: position.x,
                  y: position.y
                }
              })
            }
          />
        ) : (
          <GraphicsAreaDraw2D className="graphicsarea" />
        )}
      </div>
    );
  }
}

export default App;
