'use strict';

const website = require('./config/website');

let gsheetOptions = {};
if (process.env.GS_CONFIG) {
  gsheetOptions = JSON.parse(decodeURIComponent(`${process.env.GS_CONFIG}`));
} else {
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
          families: ['Montserrat:700'],
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
        short_name: website.shortName,
        description: website.description,
        start_url: '/',
        display: 'standalone',
        icon: website.logo,
        background_color: website.backgroundColor,
        theme_color: website.themeColor,
      },
    },

    'gatsby-plugin-styled-components',
    'gatsby-plugin-emotion',

    // Must be placed at the end
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ],
};
