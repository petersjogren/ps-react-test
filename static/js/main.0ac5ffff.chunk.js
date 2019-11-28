(this["webpackJsonpps-react-test"]=this["webpackJsonpps-react-test"]||[]).push([[0],{142:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),r=n(7),s=n.n(r),i=(n(83),n(71)),l=n(54),u=n(37),c=n(56),p=n(55),d=n(57),m=n(77),v=(n(84),n(72)),y=n.n(v),f=n(73),h=n.n(f),b=(n(87),n(88),n(36)),g=n(29);function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(Object(n),!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}(0,g.a.createSliderWithTooltip)(g.a.Range);var O=g.a.Handle,P=function(e){var t=e.value,n=e.dragging,a=e.index,r=Object(m.a)(e,["value","dragging","index"]);return o.a.createElement(b.a,{prefixCls:"rc-slider-tooltip",overlay:t,visible:n,placement:"top",key:a},o.a.createElement(O,Object.assign({value:t},r)))},j={width:400,margin:50},S=function(e){return o.a.createElement("h4",null,e.label," = (",e.position.x,", ",e.position.y,")")},w=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(e){return o.a.createElement("div",null,o.a.createElement("input",{type:"number",value:this.props.value,onChange:this.props.handleChange}),o.a.createElement("input",{type:"button",value:"Click me "+this.props.setToValue,onClick:this.props.handleClick}))}}]),t}(o.a.Component),k={nodeId:-1,direction:"input",type:"N/A"},I=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(p.a)(t).call(this,e))).state={radius:20,cx:100,scale:.9,over:k,activeDrags:0,deltaPosition:{x:0,y:0},nodes:[{id:213,position:{x:250,y:0},inputPorts:[{name:"x",type:"int"}],outputPorts:[{name:"out x",type:"float"},{name:"out y",type:"float"}]},{id:19,position:{x:0,y:0},inputPorts:[{name:"amount",type:"int"},{name:"temperature",type:"float"},{name:"the grid",type:"se.minerva.Grid"}],outputPorts:[{name:"result x",type:"float"},{name:"result y",type:"float"},{name:"result z",type:"float"}]},{id:23,position:{x:500,y:0},inputPorts:[{name:"amount",type:"int"},{name:"temperature",type:"float"}],outputPorts:[{name:"red",type:"int"},{name:"blue",type:"int"},{name:"green",type:"int"},{name:"alpha",type:"float"},{name:"grid",type:"se.minerva.Grid"}]}],connections:[{from:{nodeIndex:0,index:0},to:{nodeIndex:1,index:1}},{from:{nodeIndex:2,index:4},to:{nodeIndex:1,index:2}}],knobValue:50},n.onStart=function(){n.setState({activeDrags:n.state.activeDrags+1})},n.onStop=function(){n.setState({activeDrags:n.state.activeDrags-1})},n.onControlledDrag=function(e,t,a){var o=x({},n.state);o.nodes[a].position.x=t.x,o.nodes[a].position.y=t.y,n.setState(o)},n.state.radius=20,n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"onControlledDragStop",value:function(e){var t=this;return function(n,a){t.onControlledDrag(n,a,e),t.onStop()}}}]),Object(u.a)(t,[{key:"render",value:function(e){var t=this,n={onStart:this.onStart,onStop:this.onStop};return o.a.createElement("div",{className:"App"},o.a.createElement("div",{style:j},o.a.createElement("p",null,"Zoom"),o.a.createElement(g.a,{min:20,max:150,defaultValue:100,handle:P,onChange:function(e){return t.setState({scale:e/100})}})),o.a.createElement(h.a,{label:"Save state to disk",tagName:"h2",filename:"state.txt",exportFile:function(){return JSON.stringify(t.state,null,2)}},o.a.createElement("h1",null,"Save state to disk")),o.a.createElement("div",{style:{transform:"scale("+this.state.scale+")"}},this.state.nodes.map((function(e,a){return o.a.createElement(y.a,Object.assign({handle:"strong",position:t.state.nodes[a].position},n,{onStop:t.onControlledDragStop(a)}),o.a.createElement("div",{className:"box no-cursor"},o.a.createElement("strong",{className:"cursor"},o.a.createElement("div",{className:"drag"},"Drag here")),"I have id ",t.state.nodes[a].id,o.a.createElement(S,{label:"Position "+a,position:t.state.nodes[a].position}),"My input methods are ",o.a.createElement("br",null),o.a.createElement("ul",null,t.state.nodes[a].inputPorts.map((function(e,n){return o.a.createElement("li",{className:null!=t.state.over&&"input"!==t.state.over.direction&&t.state.over.nodeId!==t.state.nodes[a].id&&e.type===t.state.over.type?"list-bold-view":"list-view",onMouseEnter:function(e){return t.setState({over:{nodeId:t.state.nodes[a].id,direction:"input",type:t.state.nodes[a].inputPorts[n].type}})},onMouseOut:function(e){return t.setState({over:k})}},t.state.nodes[a].inputPorts[n].name+": "+t.state.nodes[a].inputPorts[n].type)}))),o.a.createElement("br",null),"My output methods are ",o.a.createElement("br",null),o.a.createElement("ul",null,t.state.nodes[a].outputPorts.map((function(e,n){return o.a.createElement("li",{className:null!=t.state.over&&"output"!==t.state.over.direction&&t.state.over.nodeId!==t.state.nodes[a].id&&e.type===t.state.over.type?"list-bold-view":"list-view",onMouseEnter:function(e){return t.setState({over:{nodeId:t.state.nodes[a].id,direction:"output",type:t.state.nodes[a].outputPorts[n].type}})},onMouseOut:function(e){return t.setState({over:k})}},t.state.nodes[a].outputPorts[n].name+": "+t.state.nodes[a].outputPorts[n].type)})))))}))),o.a.createElement("div",{className:"position-view"},this.state.nodes.map((function(e,n){return o.a.createElement(S,{label:"Position "+n,position:t.state.nodes[n].position})})),o.a.createElement(w,{setToValue:"99",value:this.state.nodes[0].position.x,handleClick:function(e){var n=x({},t.state);return n.nodes[0].position.x=99,t.setState(n)},handleChange:function(e){var n=x({},t.state);n.nodes[0].position.x=parseInt(e.target.value,0)||0,t.setState(n)}})),o.a.createElement("div",null,o.a.createElement("ul",null,this.state.connections.map((function(e,n){return o.a.createElement("li",{className:"list-view"},t.state.nodes[e.from.nodeIndex].id+":"+t.state.nodes[e.from.nodeIndex].outputPorts[e.from.index].name+" -> "+t.state.nodes[e.to.nodeIndex].id+":"+t.state.nodes[e.to.nodeIndex].inputPorts[e.to.index].name)})))))}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},78:function(e,t,n){e.exports=n(142)},83:function(e,t,n){},84:function(e,t,n){}},[[78,1,2]]]);
//# sourceMappingURL=main.0ac5ffff.chunk.js.map