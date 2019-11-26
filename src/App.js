import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import Knob from "./components/Knob";
import logo from "./logo.svg";
import "./App.css";
import Draggable from "react-draggable";
import { default as Knob2 } from "react-canvas-knob";

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

class App extends React.Component {
  state = {
    radius: 20,
    cx: 100,

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
        inputMethods: ["x"],
        outputMethods: ["out x", "out y"]
      },
      {
        id: 19,
        position: {
          x: 0,
          y: 0
        },
        inputMethods: ["temperature", "position", "color", "intensity"],
        outputMethods: ["out"]
      },
      {
        id: 23,
        position: {
          x: 500,
          y: 0
        },
        inputMethods: [
          "red",
          "green",
          "blue",
          "yellow",
          "orange",
          "light blue",
          "marble"
        ],
        outputMethods: ["out"]
      }
    ],
    knobValue: 50
  };

  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  onStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags });
  };

  // For controlled component

  onControlledDrag = (e, position, index) => {
    const { x, y } = position;
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
    const { deltaPosition } = this.state;
    return (
      <div className="App">
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
                {this.state.nodes[index].inputMethods.map(
                  (key, methodIndex) => (
                    <li
                      className={
                        this.state.over == methodIndex
                          ? "list-bold-view"
                          : "list-view"
                      }
                      onMouseOver={e => this.setState({ over: methodIndex })}
                    >
                      {this.state.nodes[index].inputMethods[methodIndex]}
                    </li>
                  )
                )}
              </ul>
              <br />
              My output methods are <br />
              <ul>
                {this.state.nodes[index].outputMethods.map(
                  (key, methodIndex) => (
                    <li className="list-view">
                      {this.state.nodes[index].outputMethods[methodIndex]}
                    </li>
                  )
                )}
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
      </div>
    );
  }
}

export default App;
