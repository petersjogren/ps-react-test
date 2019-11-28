import React from "react";
import "./App.css";
import Draggable from "react-draggable";
import DownloadLink from "react-download-link";

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
    over: kNoMetod,
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0
    },
    nodes: [
      {
        id: 213,
        position: {
          x: 250,
          y: 0
        },
        inputPorts: [{ name: "x", type: "int" }],
        outputPorts: [
          { name: "out x", type: "float" },
          { name: "out y", type: "float" }
        ]
      },
      {
        id: 19,
        position: {
          x: 0,
          y: 0
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
        id: 23,
        position: {
          x: 500,
          y: 0
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

  onControlledDrag = (e, position, index) => {
    var newState = { ...this.state };
    newState.nodes[index].position.x = position.x;
    newState.nodes[index].position.y = position.y;
    this.setState(newState);
  };

  onControlledDragStop(index) {
    return (e, position) => {
      this.onControlledDrag(e, position, index);
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
        <DownloadLink
          label="Save state to disk"
          tagName="h2"
          filename="state.txt"
          exportFile={() => JSON.stringify(this.state, null, 2)}
        >
          <h1>Save state to disk</h1>
        </DownloadLink>
        {this.state.nodes.map((key, index) => (
          <Draggable
            position={this.state.nodes[index].position}
            {...dragHandlers}
            onStop={this.onControlledDragStop(index)}
          >
            <div className="box">
              I have id {this.state.nodes[index].id}
              <ShowPosition
                label={"Position " + index}
                position={this.state.nodes[index].position}
              />
              My input methods are <br />
              <ul>
                {this.state.nodes[index].inputPorts.map((key, methodIndex) => (
                  <li
                    className={
                      this.state.over != null &&
                      this.state.over.direction !== "input" &&
                      this.state.over.nodeId !== this.state.nodes[index].id &&
                      key.type === this.state.over.type
                        ? "list-bold-view"
                        : "list-view"
                    }
                    onMouseEnter={e =>
                      this.setState({
                        over: {
                          nodeId: this.state.nodes[index].id,
                          direction: "input",
                          type: this.state.nodes[index].inputPorts[methodIndex]
                            .type
                        }
                      })
                    }
                    onMouseOut={e =>
                      this.setState({
                        over: kNoMetod
                      })
                    }
                  >
                    {this.state.nodes[index].inputPorts[methodIndex].name +
                      ": " +
                      this.state.nodes[index].inputPorts[methodIndex].type}
                  </li>
                ))}
              </ul>
              <br />
              My output methods are <br />
              <ul>
                {this.state.nodes[index].outputPorts.map((key, methodIndex) => (
                  <li
                    className={
                      this.state.over != null &&
                      this.state.over.direction !== "output" &&
                      this.state.over.nodeId !== this.state.nodes[index].id &&
                      key.type === this.state.over.type
                        ? "list-bold-view"
                        : "list-view"
                    }
                    onMouseEnter={e =>
                      this.setState({
                        over: {
                          nodeId: this.state.nodes[index].id,
                          direction: "output",
                          type: this.state.nodes[index].outputPorts[methodIndex]
                            .type
                        }
                      })
                    }
                    onMouseOut={e =>
                      this.setState({
                        over: kNoMetod
                      })
                    }
                  >
                    {this.state.nodes[index].outputPorts[methodIndex].name +
                      ": " +
                      this.state.nodes[index].outputPorts[methodIndex].type}
                  </li>
                ))}
              </ul>
            </div>
          </Draggable>
        ))}

        <div className="position-view">
          {this.state.nodes.map((key, index) => (
            <ShowPosition
              label={"Position " + index}
              position={this.state.nodes[index].position}
            />
          ))}
          <InputNumber
            setToValue="99"
            value={this.state.nodes[0].position.x}
            handleClick={props => {
              var newState = { ...this.state };
              newState.nodes[0].position.x = 99;
              return this.setState(newState);
            }}
            handleChange={event => {
              var newState = { ...this.state };
              newState.nodes[0].position.x =
                parseInt(event.target.value, 0) || 0;
              this.setState(newState);
            }}
          />
        </div>

        <div>
          <ul>
            {this.state.connections.map((key, index) => (
              <li className="list-view">
                {this.state.nodes[key.from.nodeIndex].id +
                  ":" +
                  this.state.nodes[key.from.nodeIndex].outputPorts[
                    key.from.index
                  ].name +
                  " -> " +
                  this.state.nodes[key.to.nodeIndex].id +
                  ":" +
                  this.state.nodes[key.to.nodeIndex].inputPorts[key.to.index]
                    .name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
