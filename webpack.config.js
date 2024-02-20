const path = require('path');

module.exports = {
  mode: "production",
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js',
    publicPath: '/',
  },
  devtool: "source-map",
  watch: false, 
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
