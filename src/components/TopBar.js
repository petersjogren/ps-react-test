import React from "react";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import { connect } from "react-redux";

const Handle = Slider.Handle;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const TopBar = props => {
  if (props.showControls) {
    return (
      <div className="topbar">
        <div className="zoom">
          <Slider
            min={20}
            max={150}
            value={props.scale}
            handle={handle}
            onChange={props.onChange}
          />
        </div>
      </div>
    );
  } else {
    return <div className="topbar"></div>;
  }
};

export default connect()(TopBar);
