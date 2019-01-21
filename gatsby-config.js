'use strict';

const website = require('./config/website');

let gsheetOptions = {
  spreadsheetId: process.env.GS_ID,
  worksheetTitle: process.env.GS_TITLE,
  credentials: {
    type: 'service_account',
    project_id: process.env.GS_PROJECT_ID,
    private_key_id: process.env.GS_PRIVATE_KEY_ID,
    private_key: process.env.GS_PRIVATE_KEY,
    client_email: process.env.GS_CLIENT_EMAIL,
    client_id: process.env.GS_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(
      process.env.GS_CLIENT_EMAIL
    )}`,
  },
};

if (process.env.NODE_ENV !== 'production') {
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
