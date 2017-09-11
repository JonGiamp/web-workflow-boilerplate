/*  eslint global-require: 0  */
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const FlowtypePlugin = require('flowtype-loader/plugin');

const PUBLIC = path.resolve(__dirname, 'public');
const PORT = 1415;

const isProd = process.env.NODE_ENV === 'prod';
const jsLoaders = [
  { loader: 'babel-loader' },
  {
    loader: 'flowtype-loader',
    options: {
      failOnError: isProd,
    },
  },
  {
    loader: 'eslint-loader',
    options: {
      failOnWarning: isProd,
      failOnError: isProd,
    },
  },
];
const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      minimize: isProd,
      camelCase: true,
      importLoaders: 1,
      url: true,
      historyApiFallback: true,
      quiet: true,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        require('autoprefixer')({
          browsers: ['last 3 versions'],
        }),
      ],
    },
  },
];
const assetsLoaders = [
  {
    loader: 'url-loader',
    options: {
      limit: 6500,
      name: '[name][hash:8].[ext]',
    },
  },
  {
    loader: 'img-loader',
    options: {
      enabled: isProd,
    },
  },
];

const config = {
  entry: {
    // This object key name define [name] variable inside filename string
    app: ['./assets/css/main.css', './src/index.js'],
  },
  watch: !isProd,
  output: {
    filename: '[name].js',
    path: `${PUBLIC}/assets`,
    publicPath: '/assets/',
  },
  resolve: {
    alias: {
      '@css': path.resolve(__dirname, 'assets/css'),
      '@img': path.resolve(__dirname, 'assets/img'),
      '@js': path.resolve(__dirname, 'src'),
      '@fonts': path.resolve(__dirname, 'assets/fonts'),
    },
  },
  devtool: isProd ? 'cheap-module-eval-source-map' : 'source-map',
  devServer: {
    contentBase: PUBLIC,
    port: PORT,
    hot: true,
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: jsLoaders,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders,
        }),
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: 'file-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: assetsLoaders,
      },
    ],
  },
  plugins: [
    new DashboardPlugin(),
    new FlowtypePlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: !isProd,
    }),
    new CleanWebpackPlugin('public', {
      root: __dirname,
      verbose: true,
      dry: false,
      exclude: ['index.html'],
    }),
  ],
};

if (isProd) {
  config.plugins = [
    ...config.plugins,
    new UglifyJSPlugin({ sourceMap: true }),
  ];
}

module.exports = config;
