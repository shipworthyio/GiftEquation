'use strict';

const website = require('./config/website');

let gsheetOptions = {};
if (process.env.GS_CONFIG) {
  gsheetOptions = JSON.parse(decodeURIComponent(`${process.env.GS_CONFIG}`));
} else if (process.env.NODE_ENV !== 'production') {
  gsheetOptions = require('./private/google-sheets-config.json');
}

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: website.url,
    title: website.title,
    titleAlt: website.titleAlt,
    description: website.description,
    banner: website.logo,
    headline: website.headline,
    siteLanguage: website.siteLanguage,
    ogLanguage: website.ogLanguage,
    author: website.author,
    twitter: website.twitter,
    facebook: website.facebook,
  },

  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-emotion',

    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',

    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          src: 'src',
        },
      },
    },

    {
      resolve: 'gatsby-source-google-sheets',
      options: gsheetOptions,
    },

    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Montserrat'],
        },
      },
    },

    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GTM_KEY,
      },
    },

    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: website.title,
        short_name: website.titleAlt,
        description: website.description,
        start_url: '/',
        display: 'standalone',
        icon: website.logo,
      },
    },

    // Must be placed at the end
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ],
};
