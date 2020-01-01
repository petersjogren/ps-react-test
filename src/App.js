import React from "react";
import { connect } from "react-redux";

import "./App.css";
import "./NodeList.css";
import { NodeList } from "./components/NodeList";

import GraphicsAreaPureHTML from "./components/GraphicsAreaPureHTML";
import GraphicsAreaDraw2D from "./components/CanvasDraw2D";

import "katex/dist/katex.min.css";

import TopBar from "./components/TopBar";
import {
  zoomAction,
  deleteSelectedAction,
  toggleGraphicsLibraryAction,
  resetStateNormalAction,
  resetStateStressTestAction,
  loadDefaultNodeTemplatesAsyncAction,
  loadOtherNodeTemplatesAsyncAction
} from "./redux/actions";

class App extends React.Component {
  componentDidMount() {
    document.body.addEventListener("keydown", e => {
      console.log("key down ", e, this);
      if (e.key === "Backspace") {
        this.props.deleteSelected();
      }
    });
  }

  componentWillUnmount() {
    //document.body.removeEventListener("keydown", ???);
  }

  render() {
    return (
      <div className="App noselect">
        <div
          className="buttonrow"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <button onClick={this.props.resetStateNormal}>Some nodes</button>
          <button onClick={this.props.resetStateStressTest}>Stress test</button>
          <button onClick={this.props.toggleGraphicsLibrary}>
            Pure HTML / Draw2D
          </button>
        </div>
        <TopBar
          className="topbar"
          showControls={this.props.state.pureHTMLgraph}
          scale={this.props.state.scale * 100}
          state={this.props.state}
          onChange={this.props.onZoomChange}
        />
        <div className="editor">
          <div className="nodelist">
            <NodeList
              templates={this.props.state.nodeTemplates}
              onLoadDefault={this.props.onLoadDefault}
              onLoadOther={this.props.onLoadOther}
            />
          </div>
          {this.props.state.pureHTMLgraph ? (
            <GraphicsAreaPureHTML />
          ) : (
            <GraphicsAreaDraw2D />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => ({
  deleteSelected: () => dispatch(deleteSelectedAction()),
  onZoomChange: scale => dispatch(zoomAction(scale)),
  toggleGraphicsLibrary: () => dispatch(toggleGraphicsLibraryAction()),
  resetStateNormal: () => dispatch(resetStateNormalAction()),
  resetStateStressTest: () => dispatch(resetStateStressTestAction()),
  onLoadDefault: () => dispatch(loadDefaultNodeTemplatesAsyncAction()),
  onLoadOther: () => dispatch(loadOtherNodeTemplatesAsyncAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
