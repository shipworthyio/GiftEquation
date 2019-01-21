import React from 'react';

const SvgCaretUp = props => (
  <svg width={12} height={7} {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M-6-8h24v24H-6z" />
      <path
        d="M5.29.71L.7 5.3a.996.996 0 1 0 1.41 1.41L6 2.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L6.7.71a.996.996 0 0 0-1.41 0z"
        fill={props.color}
      />
    </g>
  </svg>
);

export default SvgCaretUp;
