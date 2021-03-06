import React from "react";

interface Template {
  title: string;
}

interface Props {
  templates: Template[];
  onLoadDefault: () => void;
  onLoadOther: () => void;
  onCreateNode: (index: number, title: string) => void;
}

export class NodeList extends React.Component<Props, object> {
  shouldComponentUpdate(newProps: Props) {
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
              onClick={() => this.props.onCreateNode(index, value.title)}
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
