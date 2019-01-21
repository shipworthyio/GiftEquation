import React from 'react';

const SvgAll = props => (
  <svg width={22} height={18} {...props}>
    <path
      d="M4.66 2h2.014L5.246 7h-2.73L4.66 2zM12 2h1.246l1.428 5H12V2zM7.326 7l1.428-5H10v5H7.326zm12.157 0h-2.729l-1.428-5h2.015l2.142 5zM10 15H5v-4h5v4zm11.92-7.394l-3-7A.999.999 0 0 0 18 0H4c-.4 0-.762.238-.919.606l-3 7A1 1 0 0 0 1.001 9h1v8a1 1 0 0 0 1 1h10v-7h4v7h2a1 1 0 0 0 1-1V9h1a.999.999 0 0 0 .918-1.394z"
      fill={props.color}
      fillRule="evenodd"
    />
  </svg>
);

export default SvgAll;
