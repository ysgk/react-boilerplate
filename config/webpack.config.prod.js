const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const url = require('url')
const webpack = require('webpack')
const paths = require('./paths')

module.exports = (env = {}) => {
  return {
    mode: 'production',
    entry: path.resolve(paths.src, 'index.tsx'),
    devtool: 'eval',
    output: {
      path: path.resolve(paths.root, 'dist'),
      filename: '[name]-[contenthash].bundle.js',
      publicPath: url.resolve(env.assetHost, 'dist/'),
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|svg|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 8192,
              context: 'src/react',
              name: '[path][name].[ext]',
            },
          },
        },
        {
          test: /\.tsx?$/,
          use: ['babel-loader', 'awesome-typescript-loader'],
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([{ from: path.resolve(paths.public, '**/*'), context: paths.public }]),
      new CleanWebpackPlugin(['dist'], {
        root: path.resolve(paths.root),
      }),
      new webpack.DefinePlugin({
        // ビルド時に環境変数を置き換えてくれるように設定できるプラグイン
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new CompressionPlugin({
        test: /\.(js|css|svg|html)$/,
        filename: '[path]',
      }),
    ],
    optimization: {
      minimizer: [new TerserPlugin({
        parallel: true,
        sourceMap: true,
      })],
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
  }
}
