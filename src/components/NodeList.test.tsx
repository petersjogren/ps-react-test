import React from "react";
import { createRoot } from "react-dom/client";
import { NodeList } from "./NodeList";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <NodeList
      templates={[{ title: "One" }, { title: "Two" }]}
      onLoadDefault={() => {}}
      onLoadOther={() => {}}
      onCreateNode={(index, title) => {}}
    />
  );
  root.unmount();
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
