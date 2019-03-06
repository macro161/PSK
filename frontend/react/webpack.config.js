let HtmlWebpackPlugin = require('html-webpack-plugin');

let appDir = __dirname + '/src/';
let buildDir = __dirname + '/src/dist/';

module.exports = {
  entry: {
    app: appDir + 'index.js',
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: '[name].bundle.[hash].js',
    path: buildDir
  },
  plugins: [new HtmlWebpackPlugin({
    template: appDir + 'index.html',
    chunks: ['vendor', 'app']
  })],
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: buildDir,
    hot: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
