import React from 'react';

const SvgTechie = props => (
  <svg width={20} height={22} {...props}>
    <path
      d="M12 10a1 1 0 1 1 2 0 1 1 0 1 1-2 0zm-2 1H7V9h3v2zM7 2h6v2H7V2zm10 4h-2V1a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v5H3C1.346 6 0 7.346 0 9v4h2V9c0-.551.449-1 1-1h1v12H3v2h5v-2H7v-4h6v4h-1v2h5v-2h-1V8h1c.551 0 1 .449 1 1v4h2V9c0-1.654-1.346-3-3-3z"
      fill={props.color}
      fillRule="evenodd"
    />
  </svg>
);

export default SvgTechie;
