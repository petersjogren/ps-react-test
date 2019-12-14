import React from "react";
import $ from "jquery";
window.jQuery = window.$ = $;
require("jqueryui");
var draw2d = require("draw2d");

export default class CanvasDraw2D extends React.Component {
  componentDidMount() {
    this.renderCanvas("mycanvasdraw2d");
  }

  renderCanvas(canvasId) {
    var canvas = new draw2d.Canvas(canvasId);

    // create and add two nodes which contains Ports (In and OUT)
    //
    var start = new draw2d.shape.node.Start();
    var end = new draw2d.shape.node.End();

    // ...add it to the canvas
    canvas.add(start, 50, 50);
    canvas.add(new draw2d.shape.node.Start(), 50, 250);
    canvas.add(end, 230, 150);

    // Create a Connection and connect the Start and End node
    //
    var c = new draw2d.Connection();
    c.setRouter(new draw2d.layout.connection.SplineConnectionRouter());

    // Set the endpoint decorations for the connection
    //
    c.setSourceDecorator(new draw2d.decoration.connection.BarDecorator());
    c.setTargetDecorator(new draw2d.decoration.connection.DiamondDecorator());
    // Connect the endpoints with the start and end port
    //
    c.setSource(start.getOutputPort(0));
    c.setTarget(end.getInputPort(0));

    // and finally add the connection to the canvas
    canvas.add(c);

    var figure = new draw2d.shape.analog.OpAmp();
    canvas.add(figure, 350, 110);

    var p1 = new draw2d.shape.basic.Polygon();
    var p2 = new draw2d.shape.basic.Polygon();

    canvas.add(p1, 450, 150);
    canvas.add(p2, 450, 200);

    p2.setBackgroundColor("#f0f000");
    p2.setAlpha(0.7);
    p2.setDimension(100, 60);

    canvas.setCurrentSelection(p2);

    var shape = new draw2d.shape.basic.Text();

    shape.setText("This is a simple text with some loooooong word in.");
    shape.setBackgroundColor("#f0f000");

    canvas.add(shape, 550, 10);

    var lshape = new draw2d.shape.basic.Label();

    lshape.setText("This is a label.");
    lshape.setBackgroundColor("#f0f000");

    canvas.add(lshape, 350, 70);

    var pie = new draw2d.shape.diagram.Pie(80, 80);
    pie.setWidth(100);
    pie.setData([30, 60, 122, 4]);
    canvas.add(pie, 600, 160);

    var postit = new draw2d.shape.note.PostIt();
    postit.installEditor(new draw2d.ui.LabelInplaceEditor());
    postit.setColor("#000000");
    postit.setPadding(20);

    postit.setText("This is simple sticky note\nDouble click to edit.");

    canvas.add(postit, 700, 10);

    var label = new draw2d.shape.basic.Label();

    label.installEditor(new draw2d.ui.LabelInplaceEditor());
    label.setText("Double click me to edit");

    canvas.add(label, 50, 10);

    // Override the default connection type. This is used during drag&drop operations of ports.
    //
    draw2d.Connection.createConnection = function(sourcePort, targetPort) {
      // return my special kind of connection
      var con = new draw2d.Connection();
      con.setRouter(new draw2d.layout.connection.FanConnectionRouter());
      return con;
    };

    // create and add two nodes which contains Ports (In and OUT)
    //
    start = new draw2d.shape.node.Start();
    end = new draw2d.shape.node.End();

    // ...add it to the canvas
    canvas.add(start, 50, 250);
    canvas.add(end, 230, 280);

    // first Connection
    //
    c = draw2d.Connection.createConnection();
    c.setSource(start.getOutputPort(0));
    c.setTarget(end.getInputPort(0));
    canvas.add(c);

    // second Connection
    //
    c = draw2d.Connection.createConnection();
    c.setSource(start.getOutputPort(0));
    c.setTarget(end.getInputPort(0));
    canvas.add(c);

    // third Connection
    //
    c = draw2d.Connection.createConnection();
    c.setSource(start.getOutputPort(0));
    c.setTarget(end.getInputPort(0));
    canvas.add(c);

    // fourth Connection
    //
    c = draw2d.Connection.createConnection();
    c.setSource(start.getOutputPort(0));
    c.setTarget(end.getInputPort(0));
    canvas.add(c);

    // Zoom mose wheel support
    canvas.installEditPolicy(new draw2d.policy.canvas.WheelZoomPolicy());
    shape = new draw2d.shape.basic.Text({
      text: "Use the mouse wheel + SHIFT to zoom"
    });

    canvas.add(shape, 400, 300);

    // Register some callbacks
    canvas.on("select", function(emitter, event) {
      if (event.figure !== null) {
        console.log("figure selected");
      } else {
        console.log("selection cleared");
      }
    });

    $("#mycanvasdraw2d").click(function(ev) {
      console.log("Mouse click:" + ev.clientX + "," + ev.clientY);
    });

    // Log state to console
    var writer = new draw2d.io.json.Writer();
    writer.marshal(canvas, json => console.log(json));

    // Custom shape
    {
      class CustomFigure extends draw2d.SVGFigure {
        constructor(attr) {
          super(attr);

          this.index = 0;
          this.svgs = [];

          this.svgs.push(
            '<svg xmlns="http://www.w3.org/2000/svg">' +
              '  <path stroke="#000" fill="#FFF" stroke-miterlimit="4" d="m0,49.842l0,-49.742l49.982,0l0,49.742l-49.982,0z" id="polygon3873"/>' +
              '  <text text-anchor="middle" fill="#000000" font-family="Sans-serif" x="24.81563" y="26.50938" xml:space="preserve" font-size="8px" id="svg_1">Click me</text>' +
              "</svg>"
          );

          this.svgs.push(
            '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">' +
              '<rect x="14" y="23" width="20" height="20" fill="lime" stroke="black" />' +
              "</svg>"
          );

          this.on(
            "click",
            function() {
              this.index = ++this.index % this.svgs.length;
              this.setSVG(this.svgs[this.index], 500);
            },
            this
          );
        }

        getSVG() {
          return this.svgs[0];
        }
      }

      var fig = new CustomFigure();

      canvas.add(fig, 100, 100);
    }
  }

  render() {
    return <div id="mycanvasdraw2d"></div>;
  }
}

export class GraphicsAreaDraw2D extends React.Component {
  render() {
    return (
      <div className="graphicsarea" style={{ transform: "scale(1)" }}>
        <CanvasDraw2D className="canvas2darea" />
      </div>
    );
  }
}
