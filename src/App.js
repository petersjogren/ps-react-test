import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import Knob from "./components/Knob";
import logo from "./logo.svg";
import "./App.css";
import Draggable from "react-draggable";
import { default as Knob2 } from "react-canvas-knob";

function makeDraggable(comp) {
  let translateX = 0;
  let translateY = 0;
  const handleDrag = d3
    .drag()
    .subject(function() {
      const me = d3.select(this);
      return { x: translateX, y: translateY };
    })
    .on("drag", function() {
      const me = d3.select(this);
      const transform = `translate(${d3.event.x}, ${d3.event.y})`;
      translateX = d3.event.x;
      translateY = d3.event.y;
      me.attr("transform", transform);
    });
  const node = ReactDOM.findDOMNode(comp);
  handleDrag(d3.select(node));
}

const ShowPosition = props => (
  <h1>
    {props.label} = ({props.position.x}, {props.position.y})
  </h1>
);

class Circle extends React.Component {
  handleDragEvent = () => {
    console.log("This is a Circle");
  };

  componentDidMount() {
    makeDraggable(this);
  }
  render() {
    return <circle {...this.props} />;
  }
}
class Rect extends React.Component {
  handleDragEvent = () => {
    console.log("This is a Rect");
  };

  componentDidMount() {
    makeDraggable(this);
  }
  render() {
    return <rect {...this.props} />;
  }
}

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
        }
      },
      {
        id: 19,
        position: {
          x: 0,
          y: 0
        }
      }
    ],
    knobValue: 50
  };

  handleKnobChange(index) {
    return newValue => {
      const { x, y } = this.state.nodes[index].position;
      var newState = { ...this.state };
      newState.nodes[index].position.x = newValue;
      this.setState(newState);
    };
  }

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });
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
        <Draggable
          position={this.state.nodes[0].position}
          {...dragHandlers}
          onStop={this.onControlledDragStop(0)}
        >
          <div className="box">
            My position can be changed programmatically. <br />I have a dragStop
            handler to sync state.
          </div>
        </Draggable>
        <Draggable
          position={this.state.nodes[1].position}
          {...dragHandlers}
          onStop={this.onControlledDragStop(1)}
        >
          <div className="box">
            My position can be changed programmatically. <br />I have a dragStop
            handler to sync state.
          </div>
        </Draggable>

        <svg
          className="svgArea"
          style={{ border: "1px solid" }}
          width={300}
          height={300}
        >
          >
          <circle
            cx={this.state.cx}
            cy={100}
            r={this.state.radius}
            fill="red"
          />
          <Circle cx={50} cy={50} r={30} />
          <Rect x={100} y={100} width={50} height={50} />
        </svg>

        <Knob2
          min={0}
          max={350}
          value={this.state.nodes[0].position.x}
          onChange={this.handleKnobChange(0)}
        />

        <Knob
          size={100}
          numTicks={25}
          degrees={260}
          min={10}
          max={100}
          value={30}
          color={true}
          onChange={newValue => this.setState({ radius: newValue })}
        />

        <Knob
          size={50}
          numTicks={25}
          degrees={260}
          min={100}
          max={150}
          value={100}
          color={true}
          onChange={newValue => this.setState({ ...this.state, cx: newValue })}
        />

        <ShowPosition
          label="position 1"
          position={this.state.nodes[0].position}
        />
        <ShowPosition
          label="position 2"
          position={this.state.nodes[1].position}
        />

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
            newState.nodes[0].position.x = parseInt(event.target.value, 0) || 0;
            this.setState(newState);
          }}
        />

        <InputNumber
          setToValue="20"
          value={this.state.radius}
          handleClick={props => this.setState({ radius: 20 })}
          handleChange={event => this.setState({ radius: event.target.value })}
        />
        <InputNumber
          setToValue="40"
          value={this.state.radius}
          handleClick={props => this.setState({ radius: 40 })}
          handleChange={event => this.setState({ radius: event.target.value })}
        />
        <InputNumber
          setToValue="50"
          value={this.state.radius}
          handleClick={props =>
            this.setState({
              radius: 50
            })
          }
          handleChange={event => this.setState({ radius: event.target.value })}
        />
      </div>
    );
  }
}

export default App;
