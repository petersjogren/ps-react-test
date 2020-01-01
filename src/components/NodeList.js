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
              key={index}
              className="nodelistitem"
              draggable
              onDragStart={e => {
                //console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

                var payLoadString = JSON.stringify({
                  type: "CREATE_NODE",
                  templateIndex: index,
                  title: value.title
                });
                console.log("drag start", payLoadString);
                e.dataTransfer.setData("text/plain", payLoadString);
              }}
            >
              {value.title.substring(0, 20)}
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
