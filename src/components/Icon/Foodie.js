import React from 'react';

const SvgFoodie = props => (
  <svg width={20} height={16} {...props}>
    <g fill={props.color} fillRule="evenodd">
      <path d="M20 12H0v2h1.586l1.707 1.707A1 1 0 0 0 4 16h12a1 1 0 0 0 .707-.293L18.414 14H20v-2zM10 4v2a4.996 4.996 0 0 0-4.157 2.222L4.181 7.11A6.992 6.992 0 0 1 10 4zm9 7c0-4.624-3.507-8.441-8-8.94V0H9v2.06C4.507 2.559 1 6.376 1 11h18z" />
    </g>
  </svg>
);

export default SvgFoodie;
