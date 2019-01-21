import React from 'react';

const SvgRomantic = props => (
  <svg width={18} height={16} {...props}>
    <path
      d="M13 0c-1.594 0-3.071.837-4 2.08C8.071.837 6.594 0 5 0 2.243 0 0 2.243 0 5c0 5.491 8.124 10.632 8.47 10.848a1.002 1.002 0 0 0 1.06 0C9.876 15.632 18 10.491 18 5c0-2.757-2.243-5-5-5"
      fill={props.color}
      fillRule="evenodd"
    />
  </svg>
);

export default SvgRomantic;
