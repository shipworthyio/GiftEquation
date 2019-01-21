import React from 'react';
import Helmet from 'react-helmet';

const Twitter: React.FunctionComponent<ITwitter> = ({ type, username, title, desc, image }) => (
  <Helmet>
    {username && <meta name="twitter:creator" content={username} />}
    <meta name="twitter:card" content={type} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={desc} />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:image:alt" content={desc} />
  </Helmet>
);

export default Twitter;

export interface ITwitter {
  title: string;
  desc: string;
  image: string;
  type?: string;
  username?: string;
}

Twitter.defaultProps = {
  type: 'summary_large_image',
};
