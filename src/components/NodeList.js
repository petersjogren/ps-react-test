import React from "react";

export class NodeList extends React.Component {
  shouldComponentUpdate(newProps, newState) {
    if (this.props.templates.length !== newProps.templates.length) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.props.onLoadDefault}>Load default</button>
        <button onClick={this.props.onLoadOther}>Load many</button>
        {this.props.templates.map((value, index) => {
          return (
            <div
              className="nodelistitem"
              draggable
              onDragStart={e => {
                //console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

                var payLoadString = JSON.stringify({
                  type: "CREATE_NODE",
                  templateIndex: index
                });
                console.log("drag start", payLoadString);
                e.dataTransfer.setData("text/plain", payLoadString);
              }}
            >
              {value.title}
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
