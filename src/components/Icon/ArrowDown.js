import React from 'react';

const SvgArrowDown = props => (
  <svg width={13} height={11} {...props}>
    <path
      d="M11.68.5H1.32C.53.5.05 1.37.48 2.04l5.18 8.14a1 1 0 0 0 1.69 0l5.17-8.14A.998.998 0 0 0 11.68.5z"
      fill={props.color}
      fillRule="evenodd"
    />
  </svg>
);

export default SvgArrowDown;
