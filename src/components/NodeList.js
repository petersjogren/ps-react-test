import React from "react";

export function NodeList(props) {
  return (
    <React.Fragment>
      {props.templates.map((value, index) => {
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
