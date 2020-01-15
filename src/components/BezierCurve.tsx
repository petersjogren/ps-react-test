import React from "react";

interface Pos {
  x: number;
  y: number;
}

interface Props {
  connectionIndex: number;
  isSelected: boolean;
  isConfirmed: boolean;
  curveColor: string;
  curveWidth: number;
  start: Pos;
  end: Pos;
  c1: Pos;
  c2: Pos;
  onSelectConnection: (connectionIndex: number) => void;
}

export default class BezierCurve extends React.Component<Props, object> {
  shouldComponentUpdate(nextProps: Props) {
    const {
      isSelected,
      isConfirmed,
      connectionIndex,
      curveColor,
      curveWidth,
      start,
      end,
      c1,
      c2
    } = this.props;
    return (
      nextProps.connectionIndex !== connectionIndex ||
      nextProps.isSelected !== isSelected ||
      nextProps.isConfirmed !== isConfirmed ||
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
    const {
      isSelected,
      isConfirmed,
      connectionIndex,
      curveColor,
      curveWidth,
      start,
      end,
      c1,
      c2,
      onSelectConnection
    } = this.props;
    const curve = `M${start.x},${start.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${end.x},${end.y}`;

    return (
      <path
        onMouseDown={e => {
          e.stopPropagation();
          console.log("BezierCurve click");
          onSelectConnection(connectionIndex);
        }}
        fill="none"
        stroke={isConfirmed ? curveColor : "red"}
        strokeDasharray={isSelected ? 4 : 0}
        strokeWidth={curveWidth}
        d={curve}
      />
    );
  }
}
