import React from "react";
import draw2d from "draw2d";

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
    canvas.add(end, 230, 80);

    // Create a Connection and connect the Start and End node
    //
    var c = new draw2d.Connection();

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
