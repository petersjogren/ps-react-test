import React from "react";
import ReactDOM from "react-dom";
import { NodeList } from "./NodeList";
import renderer from "react-test-renderer";

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

it("renders the same as last time", () => {
  const component = renderer.create(
    <NodeList
      templates={[{ title: "One" }, { title: "Two" }]}
      onLoadDefault={() => {}}
      onLoadOther={() => {}}
      onCreateNode={(index, title) => {}}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
