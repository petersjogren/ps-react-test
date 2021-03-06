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
  syncAction,
  loadStateFromStringAction,
  createNodeAction
} from "./redux/actions";
import { ActionCreators } from "redux-undo";
import ServerGraph from "./components/ServerGraph";

var reader = new FileReader();
var file;

class App extends React.Component {
  componentDidMount() {
    document.body.addEventListener("keydown", e => {
      console.log("key down ", e, this);
      if (e.key === "Backspace" || e.key === "Delete") {
        this.props.deleteSelected(this.props.state);
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
          <button onClick={this.props.onUndo}>
            Undo ({this.props.sizePast})
          </button>
          <button onClick={this.props.onRedo}>
            Redo ({this.props.sizeFuture})
          </button>
          <button
            onClick={() => {
              var input = document.createElement("input");
              input.type = "file";

              input.onchange = e => {
                console.log("File loaded onchange");
                // getting a hold of the file reference
                file = e.target.files[0];

                // setting up the reader
                reader.readAsText(file, "UTF-8");

                // here we tell the reader what to do when it's done reading...
                reader.onload = readerEvent => {
                  console.log("File loaded");
                  var content = readerEvent.target.result; // this is the content!
                  this.props.onLoadStateFromString(content);
                };
              };
              input.click();
            }}
          >
            Load state
          </button>
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
                this.props.state.nodes,
                this.props.state.connections
              )
            }
          >
            Sync
          </button>
          <button onClick={() => this.props.deleteSelected(this.props.state)}>
            Del
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
              onCreateNode={this.props.onCreateNode}
            />
          </div>
          {this.props.state.pureHTMLgraph ? (
            <GraphicsAreaPureHTML />
          ) : (
            <GraphicsAreaDraw2D />
          )}
          {this.props.state.currentSessionID === "" ? "" : <ServerGraph />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state.present,
  sizePast: state.past.length,
  sizeFuture: state.future.length
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteSelected: state => dispatch(deleteSelectedAction(state)),
  onZoomChange: scale => dispatch(zoomAction(scale)),
  toggleGraphicsLibrary: () => dispatch(toggleGraphicsLibraryAction()),
  resetStateNormal: () => dispatch(resetStateNormalAction()),
  resetStateStressTest: () => dispatch(resetStateStressTestAction()),
  onLoadDefault: () => dispatch(loadDefaultNodeTemplatesAsyncAction()),
  onLoadOther: () => dispatch(loadOtherNodeTemplatesAsyncAction()),
  reconnect: () => dispatch(reconnectAction()),
  sync: (currentSessionID, nodes, connections) => {
    dispatch(syncAction(currentSessionID, nodes, connections));
  },
  onLoadStateFromString: string => dispatch(loadStateFromStringAction(string)),
  onUndo: () => dispatch(ActionCreators.undo()),
  onRedo: () => dispatch(ActionCreators.redo()),
  onCreateNode: (templateIndex, title) =>
    dispatch(createNodeAction(100, 50, templateIndex, title))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
