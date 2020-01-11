import Immutable from "immutable";
import diff from "immutablediff";

var idsOnServer = Immutable.fromJS([]);
var connectionsOnServer = Immutable.fromJS([]);

export function nodeDiffSinceLast(state) {
  var idArray = Immutable.fromJS(state.nodes.map(node => node.id));
  var connectionArray = Immutable.fromJS(state.connections);

  console.log("node diff", diff(idsOnServer, idArray).toJS());
  console.log(
    "connection diff",
    diff(connectionsOnServer, connectionArray).toJS()
  );
  idsOnServer = idArray;
  connectionsOnServer = connectionArray;
}
