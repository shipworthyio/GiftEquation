import React from 'react';

const SvgOutdoorsy = props => (
  <svg width={20} height={21} {...props}>
    <path
      d="M19.848 19.47L10.904 6.439l2.954-4.924-1.715-1.03L10 4.056 7.858.486l-1.715 1.03 2.954 4.923L.152 19.47A1.003 1.003 0 0 0 1 21h6v-2a3.001 3.001 0 0 1 6 0v2h6a1 1 0 0 0 .848-1.53"
      fill={props.color}
      fillRule="evenodd"
    />
  </svg>
);

export default SvgOutdoorsy;
