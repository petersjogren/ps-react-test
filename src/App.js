import React from "react";
import { connect } from "react-redux";

import "./App.css";

import GraphicsAreaPureHTML from "./components/GraphicsAreaPureHTML";
import GraphicsAreaDraw2D from "./components/CanvasDraw2D";

import "katex/dist/katex.min.css";

import TopBar from "./components/TopBar";
import {
  zoomAction,
  deleteSelectedAction,
  toggleGraphicsLibraryAction,
  resetStateNormalAction,
  resetStateStressTestAction
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
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button onClick={this.props.resetStateNormal}>
            <h2>Reset state to some nodes</h2>
          </button>
          <button onClick={this.props.resetStateStressTest}>
            <h2>Reset state to stress test</h2>
          </button>
          <button onClick={this.props.toggleGraphicsLibrary}>
            <h2>Toggle graphics library (Pure HTML / Draw2D)</h2>
          </button>
        </div>
        <TopBar
          className="topbar"
          showControls={this.props.state.pureHTMLgraph}
          scale={this.props.state.scale * 100}
          state={this.props.state}
          onChange={this.props.onZoomChange}
        />

        {this.props.state.pureHTMLgraph ? (
          <GraphicsAreaPureHTML />
        ) : (
          <GraphicsAreaDraw2D />
        )}
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
  resetStateStressTest: () => dispatch(resetStateStressTestAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
