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

    resolve: {
      modules: [path.resolve(__dirname, 'client'), 'node_modules'],
    },

    plugins: [
      // Configure HtmlWebpackPlugin
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E',
      }),

      // Configure InjectManifest plugin
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),

      // Configure WebpackPwaManifest plugin
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'A text editor Progressive Web App',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        // JavaScript and JSX files
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
    
        // CSS files
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
    
        // Image files
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
    
        // Font files
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
  };
};
