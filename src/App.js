import React from "react";
import Knob from "./components/Knob";
import logo from "./logo.svg";
import "./App.css";

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
    cx: 100
  };

  constructor(props) {
    super(props);
    this.state.radius = 20;
  }

  render(props) {
    return (
      <div className="App">
        <svg className="svgArea">
          <circle
            cx={this.state.cx}
            cy={100}
            r={this.state.radius}
            fill="red"
          />
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
