const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // HTML file from a template
      new HtmlWebpackPlugin({
        template: './index.html',
        chunks: ['main'],
      }),

      // Web App Manifest
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'A simple text editor Progressive Web App',
        background_color: '#ffffff',
        theme_color: '#31a9e1',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes for different devices
            destination: path.join('assets', 'icons'),
          },
        ],
      }),

      // Injects service worker
      new InjectManifest({
        swSrc: './src-sw.js', // Path to script
        swDest: 'service-worker.js', // Output file name
        exclude: [/\.map$/, /manifest\.json$/, /_redirects$/], // Files to exclude
      }),
    ],

    module: {
      rules: [
        // Add CSS loaders
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};