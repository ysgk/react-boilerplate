const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const paths = require('./paths')

module.exports = (env = {}) => {
  return {
    mode: 'development',
    entry: path.resolve(paths.src, 'index.tsx'),
    devtool: 'eval',
    output: {
      path: paths.dist,
      filename: '[name].js',
      publicPath: 'http://0.0.0.0:8080/',
    },
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' },
      port: 8080,
      hot: true,
      host: '0.0.0.0',
      contentBase: paths.dist,
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
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      }),
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

      // used for better HMR logging
      new webpack.NamedModulesPlugin(),

      // HMR
      new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {},
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
  }
}
