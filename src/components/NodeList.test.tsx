import React from "react";
import ReactDOM from "react-dom";
import { NodeList } from "./NodeList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <NodeList
      templates={[{ title: "One" }, { title: "Two" }]}
      onLoadDefault={() => {}}
      onLoadOther={() => {}}
      onCreateNode={(index, title) => {}}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
