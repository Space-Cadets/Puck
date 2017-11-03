const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const common = {
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
};

const client = {
  entry: './src/client/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'client.bundle.js',
    publicPath: '/static/',
  },
  target: 'web',
};

const server = {
  entry: './src/server/index.js',
  output: { path: __dirname + '/dist', filename: 'server.bundle.js' },
  target: 'node',
  externals: [nodeExternals()],
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server),
];
