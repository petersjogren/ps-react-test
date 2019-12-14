import React from "react";
import { connect } from "react-redux";

import "./App.css";

import GraphicsAreaPureHTML from "./components/GraphicsAreaPureHTML";
import GraphicsAreaDraw2D from "./components/CanvasDraw2D";

import "katex/dist/katex.min.css";

import TopBar from "./components/TopBar";
import { zoomAction, toggleGraphicsLibraryAction } from "./redux/actions";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <button onClick={this.props.toggleGraphicsLibrary}>
          <h2>Toggle graphics library (Pure HTML / Draw2D)</h2>
        </button>
        <TopBar
          className="topbar"
          showControls={this.props.state.pureHTMLgraph}
          defaultScale={this.props.state.scale * 100}
          state={this.props.state}
          onChange={this.props.onZoomChange}
        />

        {this.props.state.pureHTMLgraph ? (
          <GraphicsAreaPureHTML />
        ) : (
          <GraphicsAreaDraw2D className="graphicsarea" />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => ({
  onZoomChange: scale => dispatch(zoomAction(scale)),
  toggleGraphicsLibrary: () => dispatch(toggleGraphicsLibraryAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
