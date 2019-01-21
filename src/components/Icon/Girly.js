import React from 'react';

const SvgGirly = props => (
  <svg width={20} height={20} {...props}>
    <path
      d="M10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8m10-6a4 4 0 0 0-4-4 3.97 3.97 0 0 0-2.059.587C14.319 2.062 12.352 0 10 0 7.647 0 5.681 2.063 6.059 4.587A3.97 3.97 0 0 0 4 4a4 4 0 0 0 0 8c-1.446.604-2 2.336-2 4a4 4 0 0 0 8 0 4 4 0 0 0 8 0c0-1.664-.554-3.396-2-4a4 4 0 0 0 4-4"
      fill={props.color}
      fillRule="evenodd"
    />
  </svg>
);

export default SvgGirly;
