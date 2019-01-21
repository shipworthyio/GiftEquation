import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Facebook from './Facebook';
import Twitter from './Twitter';

const SEO: React.FunctionComponent = () => {
  return (
    <StaticQuery
      query={query}
      render={({
        site: {
          buildTime,
          siteMetadata: { siteUrl, title, description, banner, headline, siteLanguage, ogLanguage, twitter, facebook },
        },
      }) => {
        const seo = {
          title,
          description,
          image: `${siteUrl}${banner}`,
          url: siteUrl,
        };

        // schema.org in JSONLD format
        // https://developers.google.com/search/docs/guides/intro-structured-data
        // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

        const schemaOrgWebPage = {
          headline,
          description,
          '@context': 'http://schema.org',
          '@type': 'WebPage',
          url: siteUrl,
          inLanguage: siteLanguage,
          mainEntityOfPage: siteUrl,
          name: title,
          datePublished: '2019-01-21T10:30:00+01:00',
          dateModified: buildTime,
          image: {
            '@type': 'ImageObject',
            url: `${siteUrl}${banner}`,
          },
        };

        return (
          <>
            <Helmet title={seo.title}>
              <html lang={siteLanguage} />
              <meta name="description" content={seo.description} />
              <meta name="image" content={seo.image} />
              <meta name="gatsby-starter" content="Gatsby Starter Prismic" />
              <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>
            </Helmet>
            <Facebook
              type="website"
              desc={seo.description}
              image={seo.image}
              title={seo.title}
              url={seo.url}
              locale={ogLanguage}
              name={facebook}
            />
            <Twitter title={seo.title} image={seo.image} desc={seo.description} username={twitter} />
          </>
        );
      }}
    />
  );
};

export default SEO;

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        siteUrl
        title
        description
        banner
        headline
        siteLanguage
        ogLanguage
        twitter
        facebook
      }
    }
  }
`;
