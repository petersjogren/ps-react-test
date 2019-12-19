import React from "react";
import PropTypes from "prop-types";

export default class BezierCurve extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { curveColor, curveWidth, start, end, c1, c2 } = this.props;
    return (
      nextProps.curveColor !== curveColor ||
      nextProps.curveWidth !== curveWidth ||
      nextProps.start.x !== start.x ||
      nextProps.start.y !== start.y ||
      nextProps.end.x !== end.x ||
      nextProps.end.y !== end.y ||
      nextProps.c1.x !== c1.x ||
      nextProps.c1.y !== c1.y ||
      nextProps.c2.x !== c2.x ||
      nextProps.c2.y !== c2.y
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

BezierCurve.propTypes = {
  curveColor: PropTypes.string.isRequired,
  curveWidth: PropTypes.number.isRequired,
  start: PropTypes.exact({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  end: PropTypes.exact({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  c1: PropTypes.exact({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  c2: PropTypes.exact({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};
