/*  eslint global-require: 0  */
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'dev';
const DIST = path.resolve(__dirname, 'dist');
const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      minimize: !isDev,
      camelCase: true,
      importLoaders: 1,
      url: true,
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

const config = {
  entry: {
    // This object key name define [name] variable inside filename string
    app: ['./public/assets/css/main.css', './src/index.js'],
  },
  watch: isDev,
  output: {
    filename: '[name].js',
    path: DIST,
    publicPath: `${DIST}/`,
  },
  resolve: {
    alias: {
      '@css': path.resolve(__dirname, 'public/assets/css'),
      '@img': path.resolve(__dirname, 'public/assets/img'),
      '@js': path.resolve(__dirname, 'src/'),
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /(node_modules|dist)/,
        use: 'babel-loader',
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
        use: [
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
              enabled: !isDev,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: isDev,
    }),
    new CleanWebpackPlugin('dist', {
      root: __dirname,
      verbose: true,
      dry: false,
    }),
  ],
};

if (!isDev) {
  config.plugins = [
    ...config.plugins,
    new UglifyJSPlugin({ sourceMap: true }),
  ];
  config.devtool = 'cheap-module-eval-source-map';
  config.module.rules = [
    ...config.module.rules,
    {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'eslint-loader',
      options: {
        failOnWarning: true,
        failOnError: true,
        // cache: true,
      },
    },
  ];
}

module.exports = config;
