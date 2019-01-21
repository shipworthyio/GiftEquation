import React from 'react';

const SvgMusic = props => (
  <svg width={24} height={24} {...props}>
    <g fill={props.color} fillRule="evenodd">
      <path d="M13.783 7.024l-9 2A1 1 0 0 0 4 10v8.183A2.97 2.97 0 0 0 3 18a3 3 0 1 0 0 6 3 3 0 0 0 3-3v-7.199l7-1.555v3.937A2.97 2.97 0 0 0 12 16a3 3 0 1 0 0 6 3 3 0 0 0 3-3V8a1 1 0 0 0-1.217-.976M24 1.5a1.5 1.5 0 0 0-3 0 1.5 1.5 0 0 0-3 0C18 3 21 6 21 6s3-3 3-4.5M15 0a1 1 0 0 0-1 1 1 1 0 1 0-2 0c0 1 2 3 2 3s2-2 2-3a1 1 0 0 0-1-1M22 8a1 1 0 0 0-1 1 1 1 0 1 0-2 0c0 1 2 3 2 3s2-2 2-3a1 1 0 0 0-1-1" />
    </g>
  </svg>
);

export default SvgMusic;
