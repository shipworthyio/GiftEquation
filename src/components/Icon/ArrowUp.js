import React from 'react';

const SvgArrowUp = props => (
  <svg width={13} height={11} {...props}>
    <path
      d="M11.68 10.5H1.32a.998.998 0 0 1-.84-1.54L5.66.82a1 1 0 0 1 1.69 0l5.17 8.14a.998.998 0 0 1-.84 1.54z"
      fill={props.color}
      fillRule="evenodd"
    />
  </svg>
);

export default SvgArrowUp;
