import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import Knob from "./components/Knob";
import logo from "./logo.svg";
import "./App.css";
import Draggable from "react-draggable";

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
          type="text"
          value={this.props.radius}
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
    controlledPosition1: {
      x: 0,
      y: 0
    },
    controlledPosition2: {
      x: 0,
      y: 0
    }
  };

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

  onControlledDrag1 = (e, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition1: { x, y } });
  };

  onControlledDrag2 = (e, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition2: { x, y } });
  };

  onControlledDragStop1 = (e, position) => {
    this.onControlledDrag1(e, position);
    this.onStop();
  };

  onControlledDragStop2 = (e, position) => {
    this.onControlledDrag2(e, position);
    this.onStop();
  };

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
          defaultPosition={{ x: 0, y: 0 }}
          position={this.state.controlledPosition1}
          {...dragHandlers}
          onStop={this.onControlledDragStop1}
        >
          <div className="box">
            My position can be changed programmatically. <br />I have a dragStop
            handler to sync state.
          </div>
        </Draggable>
        <Draggable
          defaultPosition={{ x: 0, y: 0 }}
          position={this.state.controlledPosition2}
          {...dragHandlers}
          onStop={this.onControlledDragStop2}
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

        <InputNumber
          setToValue="20"
          radius={this.state.radius}
          handleClick={props => this.setState({ radius: 20 })}
          handleChange={event => this.setState({ radius: event.target.value })}
        />
        <InputNumber
          setToValue="40"
          radius={this.state.radius}
          handleClick={props => this.setState({ radius: 40 })}
          handleChange={event => this.setState({ radius: event.target.value })}
        />
        <InputNumber
          setToValue="50"
          radius={this.state.radius}
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
