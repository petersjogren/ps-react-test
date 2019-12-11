import React from "react";
import DownloadLink from "react-download-link";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

import Tooltip from "rc-tooltip";
import Slider from "rc-slider";

const wrapperStyle = { width: 400, margin: 50 };

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
        <div className="zoom" style={wrapperStyle}>
          <Slider
            min={20}
            max={150}
            defaultValue={props.defaultScale}
            handle={handle}
            onChange={props.onChange}
          />
        </div>
        <DownloadLink
          label="Save state to disk"
          className="savestate"
          tagName="h2"
          filename="state.txt"
          exportFile={() => JSON.stringify(props.state, null, 2)}
        >
          <h1>Save sta2te to disk</h1>
        </DownloadLink>
      </div>
    );
  } else {
    return (
      <div className="topbar">
        <DownloadLink
          label="Save state to disk"
          className="savestate"
          tagName="h2"
          filename="state.txt"
          exportFile={() => JSON.stringify(this.state, null, 2)}
        >
          <h1>Save state to disk</h1>
        </DownloadLink>
      </div>
    );
  }
};

export default TopBar;
