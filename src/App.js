import React from "react";
import "./App.css";
import InitialState from "./InitialState";

import GraphicsAreaPureHTML from "./components/GraphicsAreaPureHTML";
import GraphicsAreaDraw2D from "./components/CanvasDraw2D";

import "katex/dist/katex.min.css";

import TopBar from "./components/TopBar";

const kNoMetod = { nodeId: -1, direction: "input", type: "N/A" };

class App extends React.Component {
  state = InitialState();

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
