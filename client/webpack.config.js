const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Plugin that automatically create HTML page and add all webpack bundles.
      new HtmlWebpackPlugin({
        // Uses index.html as template for html.
        template: './index.html',
        // Sets <title> tag to 'JATE' in created file.
        title: 'JATE',
      }),

      // Plugin that allows you to create list of assets that are precached in service worker file.
      new InjectManifest({
        // Pathname to service worker.
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // Creates manifest.json file.
      new WebpackPwaManifest({
        name: 'JATE',
        short_name: 'JATE',
        description: 'Text editor',
        fingerprints: false,
        inject: true,
        background_color: '#000000',
        theme_color: '#000000',
        start_url: './',
        publicPath: './',
        icons: [
          {
            // Path to the icon file, path.resolve('src/images/logo.png') is absolute path.
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            // Icons will be placed in assets/icon directory.
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          // CSS loader imports css directly into javascript files
          test: /\.css$/i,
          // Style loader inserts <style> tag into head of html file, much like an import / require statement.
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          // Excludes rules from applying to node_modules directory.
          exclude: /node_modules/,
          // Babel loader transpliles code, dont have to worry about browser compatability.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env'],
              plugins: [
                // Allows use of rest and spread syntax.
                '@babel/plugin-proposal-object-rest-spread',
                // Allows use of async/await.
                '@babel/transform-runtime',
              ],
            },
          },
        },
      ],
    },
  };
};