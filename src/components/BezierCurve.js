import React from "react";
import PropTypes from "prop-types";

export default class BezierCurve extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { curveColor, curveWidth, start, end, c1, c2 } = this.props;
    return (
      nextProps.curveColor !== curveColor ||
      nextProps.curveWidth !== curveWidth ||
      nextProps.start !== start ||
      nextProps.end !== end ||
      nextProps.c1 !== c1 ||
      nextProps.c2 !== c2
    );
  }

  render() {
    const { curveColor, curveWidth, start, end, c1, c2 } = this.props;
    const curve = `M${start.x},${start.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${end.x},${end.y}`;

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
