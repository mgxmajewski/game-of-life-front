'use strict';

const path = require("path");
// Get paths of Gatsby's required rules, which as of writing is located at:
// https://github.com/gatsbyjs/gatsby/tree/fbfe3f63dec23d279a27b54b4057dd611dce74bb/packages/
// gatsby/src/utils/eslint-rules
const gatsbyRequiredRules = path.join(
 process.cwd(),
 "node_modules",
 "gatsby",
 "dist",
 "utils",
 "eslint-rules"
);

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "game-of-life-front",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "babel-plugin-styled-components",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-CBY2FFEHZK",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
      {
     resolve: "gatsby-plugin-eslint",
     options: {
       // Gatsby required rules directory
       rulePaths: [gatsbyRequiredRules],
       // Default settings that may be ommitted or customized
       stages: ["develop"],
       extensions: ["js", "jsx", "ts", "tsx"],
       exclude: ["node_modules", "bower_components", ".cache", "public"],
       // Any additional eslint-webpack-plugin options below
       // ...
     },
   },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/ // See below to configure properly
        }
      }
    },
  ],
};
