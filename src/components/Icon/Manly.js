import React from 'react';

const SvgManly = props => (
  <svg width={20} height={16} {...props}>
    <path
      d="M12 12l-1-3H9l-1 3c-3.844 0-4.776-3.404-5.387-5.033C4.22 6.881 7.555 6.557 10 5.333c2.445 1.224 5.78 1.548 7.387 1.634C16.851 8.397 15.945 12 12 12zm5.784-6.091C16.872 4.438 14.659 2 10 2S3.128 4.438 2.216 5.909L0 0v6c0 5.522 4.478 10 10 10s10-4.478 10-10V0l-2.216 5.909z"
      fill={props.color}
      fillRule="evenodd"
    />
  </svg>
);

export default SvgManly;
