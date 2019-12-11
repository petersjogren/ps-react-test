import React from "react";
import BezierComponent from "./BezierComponent";

export default class Curve extends BezierComponent {
  shouldComponentUpdate(nextProps) {
    if (super.shouldComponentUpdate(nextProps)) return true;
    const { curveColor, curveWidth, value } = this.props;
    return (
      nextProps.curveColor !== curveColor ||
      nextProps.curveWidth !== curveWidth ||
      nextProps.value !== value
    );
  }

  render() {
    const { curveColor, curveWidth, value } = this.props;
    const { x, y } = this.props;
    const sx = x[0];
    const sy = y[0];
    const ex = x[1];
    const ey = y[1];
    const cx1 = value[0];
    const cy1 = value[1];
    const cx2 = value[2];
    const cy2 = value[3];
    const curve = `M${sx},${sy} C${cx1},${cy1} ${cx2},${cy2} ${ex},${ey}`;

    return (
      <path
        fill="none"
        stroke={curveColor}
        strokeWidth={curveWidth}
        d={curve}
      />
    );
  }
}
