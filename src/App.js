import React from "react";
import { connect } from "react-redux";
import { websocketClientSetup } from "./websocketClientUtils";

import "./App.css";
import "./NodeList.css";
import { NodeList } from "./components/NodeList";

import GraphicsAreaPureHTML from "./components/GraphicsAreaPureHTML";
import GraphicsAreaDraw2D from "./components/CanvasDraw2D";

import "katex/dist/katex.min.css";
import FileSaver from "file-saver";

import TopBar from "./components/TopBar";
import {
  zoomAction,
  deleteSelectedAction,
  toggleGraphicsLibraryAction,
  resetStateNormalAction,
  resetStateStressTestAction,
  loadDefaultNodeTemplatesAsyncAction,
  loadOtherNodeTemplatesAsyncAction,
  reconnectAction,
  syncAction
} from "./redux/actions";

class App extends React.Component {
  componentDidMount() {
    document.body.addEventListener("keydown", e => {
      console.log("key down ", e, this);
      if (e.key === "Backspace" || e.key === "Delete") {
        this.props.deleteSelected();
      }
    });

    websocketClientSetup();
  }

  componentWillUnmount() {
    //document.body.removeEventListener("keydown", ???);
  }

  render() {
    return (
      <div className="App noselect">
        <div className="messagerow">
          {this.props.state.currentSessionID === ""
            ? "Server disconnected"
            : "Server online"}
          {this.props.state.isDragInProgress === true
            ? " Draggning " + this.props.state.dragPayload.type
            : ""}
        </div>
        <div
          className="buttonrow"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <button onClick={this.props.reconnect}>New session</button>
          <button
            onClick={() => {
              var stateString = JSON.stringify(this.props.state, null, 2);
              var blob = new Blob([stateString], {
                type: "text/plain;charset=utf-8"
              });
              FileSaver.saveAs(blob, "state.json");
            }}
          >
            Save state
          </button>

          <button
            onClick={() =>
              this.props.sync(
                this.props.state.currentSessionID,
                this.props.state.nodes
              )
            }
          >
            Sync
          </button>
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
  onLoadOther: () => dispatch(loadOtherNodeTemplatesAsyncAction()),
  reconnect: () => dispatch(reconnectAction()),
  sync: (currentSessionID, nodes) => {
    dispatch(syncAction(currentSessionID, nodes));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
