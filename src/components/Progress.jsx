import React, { Component } from "react";
import PropTypes from "prop-types";
import "../style/progress.scss";
import bgi from "../img/bgi.jpg";

class Progress extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, value, percent } = this.props;
    const sqSize = 150;
    const strokeWidth = 15;
    const radius = (sqSize - strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * percent) / 100;
    return (
      <div className="progress">
        <svg width={sqSize} height={sqSize} viewBox={viewBox}>
          <defs>
            <filter id="inset-shadow">
              <feFlood flood-color="black" />
              <feComposite operator="xor" in2="SourceGraphic" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite operator="in" in2="SourceGraphic" result="map" />
              <feDiffuseLighting
                lightingColor="#fff"
                surfaceScale="4"
                diffuseConstant="1.2"
              >
                <feSpotLight x="0" y="-30" z="230" />
              </feDiffuseLighting>
              <feBlend mode="multiply" in="SourceGraphic" />
              <feComposite operator="in" in2="SourceGraphic" />
            </filter>
            <pattern
              id="bgi"
              patternUnits="userSpaceOnUse"
              width="32"
              height="32"
            >
              <image xlinkHref={bgi} width="2" height="2" />
            </pattern>
          </defs>
          <circle
            className="circle__background"
            filter="url(#inset-shadow)"
            cx={sqSize / 2}
            cy={sqSize / 2}
            r={radius}
            strokeWidth={`${strokeWidth}px`}
            // transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
            fill="none"
          />
          <circle
            className={`circle__progress ${name}`}
            cx={sqSize / 2}
            cy={sqSize / 2}
            r={radius}
            strokeWidth={`${strokeWidth}px`}
            fill="transparent"
            transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset
            }}
          />
          <foreignObject className="node" width={sqSize} height={sqSize}>
            <body xmlns="http://www.w3.org/1999/xhtml">
              <div>
                <span className={`circle__value ${name}`}>{value}</span>
                <p className={`circle__name ${name}`}>{name}</p>
              </div>
            </body>
          </foreignObject>
        </svg>
      </div>
    );
  }
}

Progress.propTypes = {
  percent: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Progress;
