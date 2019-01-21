import React from 'react';

const SvgBaby = props => (
  <svg width={19} height={20} {...props}>
    <path
      d="M11 0v8h8a8 8 0 0 0-8-8zm6.32 13.89A7.948 7.948 0 0 0 19 9H4.44L3.5 7H0v2h2.22s1.89 4.07 2.12 4.42C3.24 14 2.5 15.17 2.5 16.5A3.5 3.5 0 0 0 6 20c1.76 0 3.22-1.3 3.46-3h2.08c.24 1.7 1.7 3 3.46 3a3.5 3.5 0 0 0 3.5-3.5c0-1.04-.46-1.97-1.18-2.61zM6 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
      fill={props.color}
      fillRule="nonzero"
    />
  </svg>
);

export default SvgBaby;
