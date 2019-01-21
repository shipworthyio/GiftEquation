import React from 'react';

const SvgPets = props => (
  <svg width={20} height={20} {...props}>
    <path
      d="M16.428 3.574A2.976 2.976 0 0 0 11.405.872a2.978 2.978 0 0 0 0 4.213l-6.32 6.318a2.98 2.98 0 0 0-4.212 4.213 2.975 2.975 0 0 0 2.7.81 2.98 2.98 0 0 0 .81 2.702 2.98 2.98 0 0 0 4.213-4.214l6.319-6.318a2.979 2.979 0 1 0 4.213-4.212 2.968 2.968 0 0 0-2.7-.81z"
      fill={props.color}
      fillRule="nonzero"
    />
  </svg>
);

export default SvgPets;
