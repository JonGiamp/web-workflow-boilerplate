/*  eslint global-require: 0  */
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const PUBLIC = path.resolve(__dirname, 'public');
const PORT = 1415;

const isDev = process.env.NODE_ENV === 'dev';
const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      minimize: !isDev,
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

const config = {
  entry: {
    // This object key name define [name] variable inside filename string
    app: ['./assets/css/main.css', './src/index.js'],
  },
  watch: isDev,
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
  devtool: 'source-map',
  devServer: {
    contentBase: PUBLIC,
    port: PORT,
    // open: true,
    hot: true,
    overlay: true,
    // quiet: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
    new DashboardPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: isDev,
    }),
    new CleanWebpackPlugin('public', {
      root: __dirname,
      verbose: true,
      dry: false,
      exclude: ['index.html'],
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
      },
    },
  ];
}

module.exports = config;
