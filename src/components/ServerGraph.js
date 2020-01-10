import React from "react";
import Graph from "react-graph-vis";
import { connect } from "react-redux";
import { getGraphJSONFromServerAction } from "../redux/actions";
import Immutable from "immutable";

const events = {
  select: function(event) {
    // var { nodes, edges } = event;
    // console.log("Selected nodes:");
    // console.log(nodes);
    // console.log("Selected edges:");
    // console.log(edges);
  }
};

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  }
};

class ServerGraph extends React.Component {
  shouldComponentUpdate(newProps) {
    var newPropsMap = Immutable.fromJS(newProps.serverGraph);
    var propsMap = Immutable.fromJS({
      nodes: this.props.serverGraph.nodes,
      // Remove id: from the edges because it is added for some reason
      edges: this.props.serverGraph.edges.map(n => {
        return {
          from: n.from,
          to: n.to
        };
      })
    });

    if (propsMap.equals(newPropsMap)) {
      return false;
    } else {
      return true;
    }
  }

  componentDidMount() {
    window.setInterval(this.props.onTimer, 5000);
  }

  componentWillUnmount() {
    window.clearInterval();
  }

  render() {
    return (
      <div className="servergraph">
        <h1>Server representation</h1>
        <Graph
          graph={this.props.serverGraph}
          options={options}
          events={events}
          style={{ height: "100%" }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  serverGraph: state.present.serverGraph
});

const mapDispatchToProps = dispatch => ({
  onTimer: () => dispatch(getGraphJSONFromServerAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerGraph);
