const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function(env, argv) {
  return {
    entry: {
      main: path.resolve(__dirname, 'client', 'src', 'main.tsx'),
    },
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? false : 'eval',
    output: {
      path: path.resolve(__dirname, 'dist', 'client', 'src'),
      filename: 'main.bundle.js',
      publicPath: '/',
    },
    performance: {
      hints: false,
    },
    optimization: {
      minimize: true,
      nodeEnv: 'production',
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: argv.mode === 'production',
          },
        }),
      ],
    },
    devServer: {
      static: {
        publicPath: path.resolve(__dirname, 'client', 'src'),
      },
      liveReload: true,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      preferRelative: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: env.production ? true : false,
              },
            },
          ],
          exclude: /node_modules/,
        },

        {
          test: /node_modules\/@material-ui\/core\/esm\/Popper\/Popper\.js$/,
          use: {
            loader: 'string-replace-loader',
            options: {
              search: "import PopperJS from 'popper.js';",
              replace:
                'import PopperJS from "../../../../popper.js/dist/esm/popper";',
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'client', 'src', 'index.html'),
      }),
    ],
  };
};
