import Immutable from "immutable";
import diff from "immutablediff";

var idsOnServer = Immutable.fromJS([]);

export function nodeDiffSinceLast(state) {
  var idArray = Immutable.fromJS(state.nodes.map(node => node.id));

  console.log("node diff", diff(idsOnServer, idArray).toJS());
  idsOnServer = idArray;
}
