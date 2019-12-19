import React from "react";
import Draggable from "react-draggable";
import "./InOutNode.css";

export default class InOutNode extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { scale, position } = this.props;
    return nextProps.scale !== scale || nextProps.position !== position;
  }

  render() {
    return (
      <Draggable
        key={this.props.key}
        scale={this.props.scale}
        position={this.props.position}
        onDrag={this.props.onDrag}
        handle="header"
      >
        <div className="node noselect" style={{ height: "60px" }}>
          <div className="main_area">
            <div className="addin noselect">+</div>
            <header className="nodetext noselect">Add</header>
            <div className="addout noselect">+</div>
          </div>
          <div className="port_area">
            <div className="port noselect">→</div>
            <div className="porttext in noselect">x</div>
            <div className="noport noselect"></div>
          </div>
          <div className="port_area in">
            <div className="port noselect" draggable={true}>
              →
            </div>
            <div className="porttext in noselect">y</div>
            <div className="noport noselect"></div>
          </div>
          <div className="port_area out">
            <div className="noport noselect"></div>
            <div className="porttext out noselect">sum</div>
            <div
              className="port noselect"
              draggable={true}
              onDrag={e =>
                console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
              }
            >
              →
            </div>
          </div>
        </div>
      </Draggable>
    );
  }
}
